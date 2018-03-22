import {Applications,addr,resourceTypes,resourceType,ResourceType_fetchByAppId,addResourceType,updateResourceType,delResourceType,} from '../../routeConfig';
import { Component, ViewContainerRef,OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { LoadingModule } from 'ngx-loading';
declare var $;

@Component({
  selector: 'app-resource-types',
  templateUrl: './resource-types.component.html',
  styleUrls: ['./resource-types.component.css']
})
export class ResourceTypesComponent implements OnInit {
  public loading = false;
  rtObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) { 

  
  }

// Var declarations
  id:number;
  editobj : {};
  uRt = [];
  uData:object = {};
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'application/json'});
  resourceTypes = [];
  applications= [];
  actions = [];
  newAction = "";

  p: number = 1;
  collection: any[] = this.resourceTypes;  
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  componentVisibility :Boolean;
  pushAction = function() {
    if(this.newAction != "") {
       let object = {
         action_name: this.newAction
       };
      this.actions.push(object);
      this.newAction = "";
    }
  }

  removeAction = function(index) {
    this.actions.splice(index,1);
  }
  fetchData=function() {
    this.http.get(resourceTypes).subscribe(
      (res: Response) => {
        this.resourceTypes = res.json();
     
      }
    )
   }

   //get res by app_id
session_id=sessionStorage.getItem('app_id');

appResT = function(session_id) {
  this.loading = true;
  this.http.get(ResourceType_fetchByAppId+session_id).subscribe(
   (res: Response) => {
    this.loading = false;
     this.resourceTypes = res.json();  
   }
  )
  }  

   fetchApplications=function() {
    this.http.get(Applications).subscribe(
      (res: Response) => {
        this.applications = res.json();
      }
    )
   }

   //Refresh Page
   refresh = function() {
    window.location.reload();
   }

  // Delete Rt
   deleteRt = function(id) {
    
    const url = delResourceType + id;
    return this.http.delete(delResourceType + id, {headers: this.headers}).toPromise()
      .then(() => {
        this.appResT(this.session_id);
          this.toastr.error('Resource-Type Deleted.');
          $('#deleteModal').modal('toggle');
          this._router.navigate(['/resourceTypes']);
      })
  
    }

//Add Rt
  addNewRt = function(rt) {


    if(rt.resourceType_name===undefined||rt.resourceType_name==''||rt.resourceType_name===null) {
      this.toastr.error("Resource-Type name required.")
     }
     else {
      this.rtObj = {
        "resourceType_name":rt.resourceType_name,
        "resourceType_displayname":rt.resourceType_displayname,
        "resourceType_description":rt.resourceType_description,
        "application_id":this.session_id,
        "resourceType_actions": this.actions 
      }
    this.http.post(addResourceType , this.rtObj ,  {Headers : this.headers} ).subscribe(res => {
      
        if(res._body=="unique") {
          this.toastr.error('Resource-type already exists.');
        }
        else {
          this.appResT(this.session_id);
          $('#addModal').modal('toggle');
          this.toastr.success('Resource-Type Added.');
        }
        this.actions=[];
      
      },
      err=> {
        //this.toastr.error('Resource already exists.');
       })
  
  
  }


   }

//Edit Rt

editRt = function(id) {
 
 this.http.get(resourceType+id).subscribe(
    (res: Response) => {
      this.uRt = res.json();
      this.uData = this.uRt;
      this.actions = this.uData.resourceType_actions;
    }
  )
 // this.actions=[];
}


//Upd Rt

  updateRt = function(updateData,id)
  {
    
    if(updateData.uRt_name===undefined||updateData.uRt_name==''||updateData.uRt_name===null) {
      this.toastr.error("Resource-Type name required.")
     }
    else{
      console.log(updateData.uRt_name);
      this.editObj = {
        "resourceType_name":updateData.uRt_name,
        "resourceType_displayname":updateData.uRt_displayname,
        "resourceType_description":updateData.uRt_description,
        "application_id":this.session_id,
        "resourceType_actions": this.actions 
      }
      this.http.put(updateResourceType+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
     
        $('#updateModal').modal('toggle');
        this._router.navigate(['/resourceTypes']);
        this.appResT(this.session_id);
        this.toastr.info('Resource-Type Updated.');
        this.actions=[];
      })
  }
  }

  attributeIdToBeDeleted : String;
  attributeNameToBeDeleted : String;

  // Set Delete Attribute
  setDeleteAttribute = (_id, Name) => {
    this.attributeIdToBeDeleted = _id;
    this.attributeNameToBeDeleted = Name;
  }




  ngOnInit() {
   // this.fetchData();
   if(this.session_id!=null||this.session_id!=undefined) {
    this.componentVisibility = true;
  }
   this.appResT(this.session_id);
   this.fetchApplications();
  
    
  
  }
}
  