import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';



export interface CanComponenntDeactivate {
canDeactivate :() => Observable<boolean> | Promise <boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuardService implements CanDeactivate<CanComponenntDeactivate>  //this will take our interface 
{

  canDeactivate(component : CanComponenntDeactivate, 
                currentRoute : ActivatedRouteSnapshot, 
                currentState : RouterStateSnapshot,
                nextState?:RouterStateSnapshot    
    ) : Observable<boolean> | Promise <boolean> | boolean
    //will be called by the angular router on the component which we try to leave and there for will take that component as  
    //argument which implements the interface
  {
      return component.canDeactivate();
  }
  constructor() { }
}
