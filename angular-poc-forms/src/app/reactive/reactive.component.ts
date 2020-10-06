import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  constructor() { }
  genders = ['male', 'female'];
  signupForm : FormGroup; //import it
  forbiddenNames = ['chris','anna'];

  ngOnInit()
  {
    this.signupForm = new FormGroup({
      //donnot use Validators.required() : u don't have to execute the method. 
      //u just pass the reference of the validator method so that angular can call it whenever needed
      'userData' : new FormGroup(
        {
          'username':new FormControl(null,[Validators.required,this.nameIsForbidden.bind(this)]), //u need to bind "this" so that it works in expected ways, 
          'email': new FormControl(null,[Validators.required,Validators.email],this.emailIsForbidden.bind(this))
           //async validators are passed as a seoarate argumet
           //check the console: while u type email : ng-pending class is attached to email
        }
      ),
       'gender': new FormControl('male'),
       'hobbies': new FormArray([])
    }
    );

    //statusChnages() &valueChanges() observables : to closely monitor the changes.
    // it can be applied at form or at the control
    this.signupForm.valueChanges.subscribe(value=>{
      console.log(value);
    });
    this.signupForm.statusChanges.subscribe(value=>{
      console.log(value);
    });
    // this.signupForm.setValue({
    //   //pass whole object values just like in template driven
    // })
    // this.signupForm.patchValue({
    //   //pass specific values to set
    // })
  }

  onSubmitForm(){
    console.log(this.signupForm);
    this.signupForm.reset();//to reset the form after submission
  }

  onAddHobby()
  {
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //custom validator
  nameIsForbidden(control:FormControl) : {[s:string]:boolean} //takes input argument as control, returns a js object
  {
    if(this.forbiddenNames.indexOf(control.value)!== -1)
      return {'nameForbidden':true} //this returned key value pair is added to "errors" object. u can check this in console
      else
      return null; //don't return false, rerurn null or nothing
  }


  //custom async validators :eg. when u need to check the validity of email on server
  emailIsForbidden(control : FormControl) : Promise<any> | Observable <any>
  {
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
          if(control.value === 'test@test.com')
           resolve ({'emailIsForbidden':true});
           else
           resolve (null);
      },1500);
    });
    return promise;
  }
}
