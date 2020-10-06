import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanDeactivateGuardService, CanComponenntDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponenntDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  editServer = false;
  changesSaved =  false;

  constructor(private serversService: ServersService, private acRoute : ActivatedRoute, private router: Router) 
  { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log(this.acRoute.snapshot.queryParams); //this will give u only when ngOniT is called means only once
    console.log(this.acRoute.snapshot.fragment);//this will give u only when ngOniT is called means only once

     this.acRoute.queryParams.subscribe(
       (queryParam : Params) =>{
         this.editServer = queryParam['allowEdit']==='1'?true:false;
         console.log('allow edit'+this.editServer);
       }
     );//implement this for reactive approach
    //this.acRoute.queryParams.subscribe();//implement this for reactive approach


  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo:this.acRoute});
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean
  {
    console.log('can deactivate');
    if(!this.editServer)
    {
      return true;
    }
    if((this.serverName!==this.server.name || this.serverStatus!== this.server.status) && !this.changesSaved)
    {
      return confirm('Do you want to discard the changes?');
    }
    else
    {return true;}
  }
}
