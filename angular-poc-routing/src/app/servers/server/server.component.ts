import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private acRoute : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    
    this.acRoute.data.subscribe(
      (data:Data)=> {
        this.server= data['ur_server'];
      }
    );
    // const id = +this.acRoute.snapshot.params['id']; /// + converts the value being returned to number from a string
    // console.log(id);
    // this.server = this.serversService.getServer(id);
    // this.acRoute.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit()
  {
    this.router.navigate(['edit'], {relativeTo:this.acRoute,queryParamsHandling:'preserve'});
  }
}
