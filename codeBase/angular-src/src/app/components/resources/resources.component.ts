import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { resource } from 'selenium-webdriver/http';

declare var $;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  aObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) {
    this.fetchData();
    this.fetchResourceType();
    this.fetchApplications();
    this.fetchAttribute();
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
}
  // Var declarations
  id: number;
  editobj : {};
  uresource = [];
  uData:object = {};
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'resources/json'});
  resource = [];
  applications = [];
  resourcetype = [];
  attribute = [];

  fetchData=function() {
    this.http.get("http://localhost:3000/api/Fetch/Resource").subscribe(
      (res: Response) => {
        this.resource = res.json();
        console.log(this.resource);
        
      }
    )
   }


FetchClick=function(){
  this.fetchResourceType();
  this.fetchApplications();
  this.fetchAttribute();
}

//Fetch Applications
fetchApplications=function() {
  this.http.get("http://localhost:3000/api/Applications").subscribe(
    (res: Response) => {
      this.applications = res.json();
      console.log(this.applications);
    }
  )
 }
 //Fetch ResourceType
 fetchResourceType=function() {
  this.http.get("http://localhost:3000/api/resourceTypes").subscribe(
    (res: Response) => {
      this.resourcetype = res.json();
      console.log(this.resourcetype);
    }
  )
 }
 //Fetch Attribute
 fetchAttribute=function() {
  this.http.get("http://localhost:3000/api/attributes/allAttributes").subscribe(
    (res: Response) => {
      let obj = res.json();
      let att = obj.Attributes;
      this.attribute = att;
      console.log(att);
      
    }
  )
 }

//Refresh Page
refresh = function() {
  location.reload();
}

//Del App
deleteRes = function(id) {
 
 const url = "http://localhost:3000/api/DeleteResource/" + id;
 return this.http.delete(url, {headers: this.headers}).toPromise()
   .then(() => {
   this.fetchData();
   this.toastr.error('Resource Deleted.');
  this._router.navigate(['/resource']);
 
   })

}

//Add App
addNewRes = function(a) {
 if(a.res_name != "") {
 this.aObj = {
   "res_name":a.res_name,
   "res_displayname":a.res_displayname,
   "Resource_typeid":a.Resource_typeid,
   "application_id":a.application_id,
   "attribute_id":a.attribute_id,
   "attribute_value":a.attribute_value,
   "res_descrpition":a.res_descrpition
 }
 console.log(this.aObj);
 
 this.http.post("http://localhost:3000/api/addResource" , this.aObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
   console.log(res);
 this.fetchData();
 $('#addModal').modal('toggle');
 this.toastr.success('Resource Added.');
 })
}
else{
 this.isEmpty = true;
}
}

//Edit App

editRes = function(id) {

this.http.get("http://localhost:3000/api/Resource/"+id).subscribe(
 (res: Response) => {
   this.uresource = res.json();
   console.log(res.json());
   this.uData = this.uresource;
   console.log(this.uData);


 }
)
}

//Upd App

updateRes = function(updateData,id)
{
  
  console.log(id);

  if(updateData.ures_name != "") {
    console.log(updateData.ures_name);
    this.editObj = {
      "res_name":updateData.ures_name,
      "res_displayname":updateData.ures_displayname,
      "Resource_typeid":updateData.uResource_typeid,
      "application_id":updateData.uapplication_id,
      "attribute_id":updateData.uattribute_id,
      "attribute_value":updateData.uattribute_value,
      "res_description":updateData.ures_descrpition
    }
    console.log(this.editObj);
    
    this.http.put("http://localhost:3000/api/UpdateResource/"+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      console.log(res);
      $('#updateModal').modal('toggle');
      this._router.navigate(['/resource']);
    this.fetchData();
    this.toastr.info('Resource Updated.');

  
    })
}
}


  ngOnInit() {
    this.fetchData();
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
    this.fetchData();
  }

}
