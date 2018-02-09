import { Component, ViewContainerRef,OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
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
    $(document).ready(function(){
     
      $('#dt').DataTable();

  });
  }

// Var declarations
  id:number;
  editobj : {};
  uApplication = [];
  uData:object = {};
  uExist = false;
  private headers = new Headers({ 'Content-Type': 'application/json'});
  apps = [];
  fetchData=function() {
    this.http.get("http://localhost:3000/api/Applications").subscribe(
      (res: Response) => {
        this.apps = res.json();
        console.log(this.apps);
      }
    )
   }


   //Refresh Page
   refresh = function() {
     location.reload();
   }

   //Del App
   deleteApp = function(id) {
    
    const url = "http://localhost:3000/api/delApp/" + id;
    return this.http.delete(url, {headers: this.headers}).toPromise()
      .then(() => {
      this.fetchData();
      this.toastr.error('Application Deleted.');
     this._router.navigate(['/app/application']);
    
      })
  
  }

//Add App
  addNewApp = function(a) {
    if(a.name != "") {
    this.aObj = {
      "app_id":a.id,
      "app_name":a.app_name,
      "app_displayname":a.app_displayname,
      "app_description":a.app_description
    }
    this.http.post("http://localhost:3000/api/addApp" , this.aObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      console.log(res);
    this.fetchData();
    $('#addModal').modal('toggle');
    this.toastr.success('Application Added.');
    })
  }
  else{
    this.isEmpty = true;
  }
}

//Edit App

editApp = function(id) {
 
 this.http.get("http://localhost:3000/api/"+id).subscribe(
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
    this.http.put("http://localhost:3000/api/updateApp/"+ id  , this.editObj ,  {Headers : this.headers} ).subscribe((res:Response) => {
      console.log(res);
      $('#updateModal').modal('toggle');
      this._router.navigate(['/application']);
    this.fetchData();
    this.toastr.info('Application Updated.');

  
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

