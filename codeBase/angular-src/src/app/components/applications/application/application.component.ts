import {Applications,application,addApp,updateApp,delApp} from '../../../routeConfig';
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
declare var $;

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  aObj:Object = {};
  conformationString:String = "* Please enter name";
  isEmpty:boolean = false;
  constructor(private _router: Router,  private http:Http, private route: ActivatedRoute, private toastr: ToastrService) { 
    this.fetchData();
  //   $(document).ready(function(){
     
  //     $('#dt').DataTable();

  // });
  console.log(Applications);
  }


// Var declarations
  id:number;
  editobj : {};
  uApplication = [];
  uData:object = {};
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'application/json'});
  apps = [];
  p: number = 1;
   collection: any[] = this.apps;  
   key: string = 'name';
   reverse: boolean = false;
   sort(key){
     this.key = key;
     this.reverse = !this.reverse;
   }

  fetchData=function() {
    this.http.get(Applications).subscribe(
      (res: Response) => {
        this.apps = res.json();
        console.log(this.apps);
      }
    )
   }


   //Refresh Page
   refresh = () => {
    window.location.reload();
  }

   //Del App
   deleteApp = function(id) {
    const url = delApp + id;
    return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => {
      this.fetchData();
      this.toastr.error('Application Deleted.');
      $('#deleteModal').modal('toggle');
      this._router.navigate(['/app/application']);
      })
}

//Add App
  addNewApp = function(a) {
    console.log(a);
    if(a.app_name===undefined||a.app_name===null||a.app_name==='') {
      this.toastr.error('Application name required.');
      //this.isEmpty = true;
    }
    else {

      this.aObj = {
        "app_id":a.id,
        "app_name":a.app_name,
        "app_displayname":a.app_displayname,
        "app_description":a.app_description
      }
      this.http.post(addApp , this.aObj ,  {Headers : this.headers} ).subscribe(res=> {
        if(res._body=="unique") {
          this.toastr.error('Application already exists.');
        }
        else{
          console.log(res);
          this.fetchData();
          $('#addModal').modal('toggle');
          this.toastr.success('Application Added.');
          
        }
    
      // $(document).ready(function(){
     
      //   // $('#dt').DataTable();
      //   $('#dt').each(function() {
      //     this.fetchData();
      // })
    //});
      },
      err=> {
        //this.toastr.error('Error Please .');
       })
    }
    
}

//Edit App

editApp = function(id) {
 
 this.http.get(application+id).subscribe(
    (res: Response) => {
      this.uApplication = res.json();
      console.log(res.json());
      this.uData = this.uApplication;
      console.log(this.uData);


    }
  )

}


//Upd App

updateApp = function(updateData,id)
{
  
  console.log(id);

  if(updateData.uapp_name != "") {
    console.log(updateData.uapp_name);
    this.editObj = {
      "app_name":updateData.uapp_name,
      "app_displayname":updateData.uapp_displayname,
      "app_description":updateData.uapp_description
    }
    this.http.put(updateApp+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      console.log(res);
      $('#updateModal').modal('toggle');
      this._router.navigate(['/application']);
    this.fetchData();
    this.toastr.info('Application Updated.');

  
    })
}
}

applicationIdToBeDeleted : String;
applicationNameToBeDeleted : String;

  // Set Delete Attribute
  setDeleteApplication = (_id, Name) => {
    this.applicationIdToBeDeleted = _id;
    this.applicationNameToBeDeleted = Name;
  }


  ngOnInit() {
    this.fetchData();
  //   $(document).ready(function(){
     
  //     $('#dt').DataTable();
  // });
    this.fetchData();
    
  
  }
  
}

