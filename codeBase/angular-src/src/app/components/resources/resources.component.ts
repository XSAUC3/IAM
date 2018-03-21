import {Fetch_Resource,addResource,Resource,Resource_fetchByAppId,UpdateResource,DeleteResource,Applications,resourceTypes,ResourceType_fetchByAppId,allAttributes,attributes_fetchByAppId} from '../../routeConfig';
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
    this.appRes(this.session_id);
    //this.fetchData();
    this.fetchResourceType();
    this.fetchApplications();
    this.fetchAttribute();
    console.log("session id Res: " + sessionStorage.getItem('app_id'));
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
  console.log("app"+attributes_fetchByAppId+this.session_id);
}
  // Var declarations
  id: number;
  editobj : {};
  uresource = [];
  uData:object = {};
  appData = [];
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'resources/json'});
  resource = [];
  applications = [];
  resourcetype = [];
  attribute = [];
  attributes = [];
  attribute_id = "";
  attribute_value = "";
  pushAction = function() {
    if(this.attribute_id != "") {
      var object = {
        attribute_id : this.attribute_id,
        attribute_value:this.attribute_value
      };
      this.attributes.push(object);
      this.attribute_id = "";
      this.attribute_value = "";
    }
    console.log(this.attributes);
  }
  //get res by app_id
session_id=sessionStorage.getItem('app_id');

  removeAction = function(index) {
    this.attributes.splice(index,1);
  }

  fetchData=function() {
    this.http.get(Resource).subscribe(
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
  //this.addNewRes();
}

//Fetch Applications
fetchApplications=function() {
  this.http.get(Applications).subscribe(
    (res: Response) => {
      this.applications = res.json();
      console.log(this.applications);
    }
  )
 }
 //Fetch ResourceType
 fetchResourceType=function() {
  this.http.get(ResourceType_fetchByAppId+this.session_id).subscribe(
    (res: Response) => {
      this.resourcetype = res.json();
      console.log(this.resourcetype);
    }
  )
 }
 //Fetch Attribute
 fetchAttribute=function() {
  this.http.get(attributes_fetchByAppId+this.session_id).subscribe(
    (res: Response) => {
      let a = [];
      let obj = res.json();
      let att = obj.Attributes;
      for(let i = 0 ; i < att.length ; i++){
        //console.log(i);
        if(att[i].Type == "Fixed"){
          a.push(att[i]);
        }
      }
      console.log(a);
      this.attribute = a;
    }
  )
 }


 

//Refresh Page
refresh = function() {
  window.location.reload();
}

//Del App
deleteRes = function(id) {
 
 const url =DeleteResource + id;
 return this.http.delete(url, {headers: this.headers}).toPromise()
   .then(() => {
    this.appRes(this.session_id);
  // this.fetchData();
   this.toastr.error('Resource Deleted.');
   $('#deleteModal').modal('toggle');
  this._router.navigate(['/resources']);
 
   })

}

//Add App
addNewRes = function(a) {

  if(a.res_name==undefined||a.res_name==""||a.res_name==null) {
    this.toastr.error("Resource name required.")
   }
   else {
    this.aObj = {
      "res_name":a.res_name,
      "res_displayname":a.res_displayname,
      "Resource_typeid":a.Resource_typeid,
      "application_id":this.session_id,
      "attribute_id":this.attributes,
      "res_descrpition":a.res_descrpition
    }
    console.log(this.aObj);
    
    this.http.post(addResource , this.aObj ,  {Headers : this.headers} ).subscribe(res => {
      console.log(res);
      if(res._body=="unique") {
        this.toastr.error('Resource already exists.');
      }
      else {
        this.appRes(this.session_id);
        $('#addModal').modal('toggle');
        this.toastr.success('Resource Added.');
      }
    
    },
    err=> {
      //this.toastr.error('Resource already exists.');
     })


}
}
   

//Edit App

editRes = function(id) {

this.http.get(Resource+id).subscribe(
 (res: Response) => {
   this.uresource = res.json();
   console.log(res.json());
   this.uData = this.uresource;
   this.attributes = this.uData.attribute_id;
   console.log(this.uData);


 }
)
}


appRes = function(session_id) {

  this.http.get(Resource_fetchByAppId+session_id).subscribe(
   (res: Response) => {
     this.resource = res.json();

     console.log(this.appData);
     this._router.navigate(['/resources']);
     //this.uData = this.uresource;
     //this.attributes = this.uData.attribute_id;
     //console.log("ssion_data : " + this.uData);
  
  
   }
  )
  }  

  attributeIdToBeDeleted : String;
  attributeNameToBeDeleted : String;

  // Set Delete Attribute
  setDeleteAttribute = (_id, Name) => {
    this.attributeIdToBeDeleted = _id;
    this.attributeNameToBeDeleted = Name;
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
      "application_id":this.session_id,
      "attribute_id":this.attributes,
      "attribute_value":updateData.uattribute_value,
      "res_description":updateData.ures_descrpition
    }
    console.log(this.editObj);
    
    this.http.put(UpdateResource+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      console.log(res);
      $('#updateModal').modal('toggle');
      this._router.navigate(['/resources']);
    this.appRes(this.session_id);
    this.toastr.info('Resource Updated.');

  
    })
}
}


  ngOnInit() {
   // this.fetchData();
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
   // this.fetchData();
    this.appRes(this.session_id);
  }

}
