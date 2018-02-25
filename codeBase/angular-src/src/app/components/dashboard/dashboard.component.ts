import { Component, ViewContainerRef,OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute) { 

  }


  apps = [];
  resourceTypes = [];
  attributes = [];
  resources = [];
  policies = [];
  roles =[];
  fetchData=function() {
    this.http.get("http://localhost:3000/api/Applications").subscribe(
      (res: Response) => {
        this.apps = res.json();
      }
    )
   }


   refresh = function() {
    window.location.reload();
  }
  
   fetchRt=function() {
    this.http.get("http://localhost:3000/api/resourceTypes").subscribe(
      (res: Response) => {
        this.resourceTypes = res.json();
      }
    )
   }

   fetchR=function() {
    this.http.get("http://localhost:3000/api/Fetch/Resource").subscribe(
      (res: Response) => {
        this.resources = res.json();
      }
    )
   }

   fetchAtt = function() {
    
    this.http.get("http://localhost:3000/api/attributes/allAttributes").subscribe(
      (res: Response) => {
        this.attributes = res.json();     
      }
    )
  }

  fetchPol = function() {
    
    this.http.get("http://localhost:3000/api/policies").subscribe(
      (res: Response) => {
        this.policies = res.json();     
      }
    )
  }

  fetchRoles = function() {
    
    this.http.get("http://localhost:3000/api/role/Roles").subscribe(
      (res: Response) => {
        this.roles = res.json();     
      }
    )
  }
  ngOnInit() {
    this.fetchData();
    this.fetchRt();
    this.fetchR();
    this.fetchAtt();
    this.fetchPol();
    this.fetchRoles();
  }

}
