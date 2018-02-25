import { Component, ViewContainerRef,OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
declare var $;

@Component({
  selector: 'app-resource-types',
  templateUrl: './resource-types.component.html',
  styleUrls: ['./resource-types.component.css']
})
export class ResourceTypesComponent implements OnInit {

  rtObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) { 
    this.fetchData();
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
  }

// Var declarations
  id:number;
  editobj : {};
  uRt = [];
  uData:object = {};
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'application/json'});
  resourceTypes = [];
  actions = [];
  newAction = "";
  pushAction = function() {
    if(this.newAction != "") {
       let object = {
         action_name: this.newAction
       };
      this.actions.push(object);
      this.newAction = "";
    }
    console.log(this.actions)
  }

  removeAction = function(index) {
    this.actions.splice(index,1);
  }
  fetchData=function() {
    this.http.get("http://localhost:3000/api/resourceTypes").subscribe(
      (res: Response) => {
        this.resourceTypes = res.json();
     
      }
    )
   }


   //Refresh Page
   refresh = function() {
    window.location.reload();
   }

  // Delete Rt
   deleteRt = function(id) {
    
    const url = "http://localhost:3000/api/delResourceType/" + id;
    return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => {
          this.fetchData();
          this.toastr.error('Resource-Type Deleted.');
          this._router.navigate(['/resourceTypes']);
      })
  
    }

//Add Rt
  addNewRt = function(rt) {
    console.log(rt)
    if(rt.resourceType_name != "") {
      this.rtObj = {
        "resourceType_name":rt.resourceType_name,
        "resourceType_displayname":rt.resourceType_displayname,
        "resourceType_description":rt.resourceType_description,
        "resourceType_actions": this.actions 
      }
    console.log(this.rtObj)
    this.http.post("http://localhost:3000/api/addResourceType" , this.rtObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
         console.log(res);
       this.fetchData();
          $('#addModal').modal('toggle');
          this.toastr.success('Resource-Type Added.');
          });
          this.actions=[];
  }
  else{
    this.isEmpty = true;
   }
  }

//Edit Rt

editRt = function(id) {
 
 this.http.get("http://localhost:3000/api/resourceType/"+id).subscribe(
    (res: Response) => {
      this.uRt = res.json();
      this.uData = this.uRt;
      this.actions = this.uData.resourceType_actions;
      
      console.log(this.uData);
     // console.log(this.uData);
     console.log(this.actions);


    }
  )
  //this.actions=[];
}


//Upd Rt

  updateRt = function(updateData,id)
  {
    
    console.log(id);
    if(updateData.uRt_name != "") {
      console.log(updateData.uRt_name);
      this.editObj = {
        "resourceType_name":updateData.uRt_name,
        "resourceType_displayname":updateData.uRt_displayname,
        "resourceType_description":updateData.uRt_description,
        "resourceType_actions": this.actions 
      }
      this.http.put("http://localhost:3000/api/updateResourceType/"+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
        console.log(res);
        $('#updateModal').modal('toggle');
        this._router.navigate(['/resourceTypes']);
        this.fetchData();
        this.toastr.info('Resource-Type Updated.');
        this.actions=[];
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
  