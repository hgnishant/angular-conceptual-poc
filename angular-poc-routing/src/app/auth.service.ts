import { Injectable } from '@angular/core';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  loggedIn = false;

  isAuthenticated()
  {
    //the promise only returns loggdin variable with a delay of 800ms
    const promise =  new Promise(
      (resolve,reject)=>{
        setTimeout(()=>{
          resolve(this.loggedIn);
      },800);
      }
    );
    return promise;
  }

  login()
  {
    this.loggedIn = true;
  }

  logout()
  {
    this.loggedIn = false;
  }
  constructor() { }
}
