import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private router:Router) //inject the authentication service here 
  { }
  canActivate(route : ActivatedRouteSnapshot,
              state : RouterStateSnapshot) : Observable<boolean>| Promise<boolean>| boolean
              {
               return this.authService.isAuthenticated() //call the promise created in authentication service
                .then(
                  (authenticated:boolean)=>{
                    if(authenticated) return true;
                    else return this.router.navigate(['/']); //if false then go to root
                  }
                );
              }

  CanActivateChild(route : ActivatedRouteSnapshot,
                state : RouterStateSnapshot) : Observable<boolean>| Promise<boolean>| boolean
                {
                  return this.canActivate(route,state);
                }

}
