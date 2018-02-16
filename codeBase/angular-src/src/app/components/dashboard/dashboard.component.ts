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
  fetchData=function() {
    this.http.get("http://localhost:3000/api/Applications").subscribe(
      (res: Response) => {
        this.apps = res.json();
      }
    )
   }

   fetchRt=function() {
    this.http.get("http://localhost:3000/api/resourceTypes").subscribe(
      (res: Response) => {
        this.resourceTypes = res.json();
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
  ngOnInit() {
    this.fetchData();
    this.fetchRt();
    this.fetchAtt();
  }

}
