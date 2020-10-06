import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm : NgForm;
  defaultQuestion : string ='pet';
  answer = '';
  genders = ['male','female'];
  suggestedName = 'Superuser';

  user = {
    username:'',
    email :'',
    secretQuestion:'',
    answer :'',
    gender:''
  };

  formSubmitted = false;

  suggestUserNameAll() {
    
    //allows to set values in the form. but it will override the existing form values
    //it needs to you set all values
    this.signUpForm.setValue({
     _userdata:
        { 
          username : this.suggestedName,
          email : 'abc@example.com'
        },
     secret : 'pet',
     answer : '',
     gender : 'male'
    });
  }

  suggestUserName(){
    //patchValue allows you to set value only for some controls.
    // u dont need to set for all the controls
    //this.signUpForm.form.setValue() is also available
    this.signUpForm.form.patchValue({
      _userdata:
      { username : this.suggestedName
      }
     });
  }

  // onSubmit(form:NgForm)
  // {
  //   console.log(form);
  // }

  onSubmit(form:NgForm)
  {
    this.formSubmitted=true;
    this.user.username= this.signUpForm.value._userdata.username;
    this.user.email = this.signUpForm.value._userdata.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.answer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();//will reset form as if it was re-loaded.

    console.log(this.signUpForm);
  }

  
}
