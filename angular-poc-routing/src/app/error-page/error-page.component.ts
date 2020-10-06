import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private acRoute: ActivatedRoute) { }

  erroMessage : string ='';
  ngOnInit(): void {
    this.erroMessage= this.acRoute.snapshot.data['urMsgKey'];
  }

}
