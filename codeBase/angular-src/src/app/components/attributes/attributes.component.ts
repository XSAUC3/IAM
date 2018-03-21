import {addAttribute,updateAttribute,deleteAttribute,allAttributes,attributes_fetchByAppId,attributeById,filterAttributes} from '../../routeConfig';
import { ResourceTypesComponent } from './../resource-types/resource-types.component';
import { AttributeDataService } from './services/attribute-data.service';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
declare var $;

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  applications = [];
  attributes = [];
  uData = {};
  filterApplied = false;
  filteredAttributes = [];
  filterName: String;
  filterType: String;
  filterDataType: String;
  attributeNameToBeDeleted: String;
  attributeIdToBeDeleted: String;
  p: number = 1;
  collection: any[] = this.attributes;  
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private _router: Router,
              private http: Http,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private attributeDataService: AttributeDataService) {}

  ngOnInit() {

  //  this.fetchData();
    this.appAttr(this.session_id);
  

    //this.fetchData();
    this.getApplications();

  }

  // Fetch All Attributes
  fetchData = () => {
    this.attributeDataService.getAllAttributes().subscribe(
      data => {
        this.attributes = data.Attributes;
      },
      err => {
        this.toastr.error('Something Went Wrong While Fetching Attributes.');
      }
    );
  }

  // Refresh Page
  refresh = () => {
    location.reload();
  }

  //get res by app_id
session_id=sessionStorage.getItem('app_id');
appAttr = function(session_id) {

  this.http.get(attributes_fetchByAppId+session_id).subscribe(
   (res: Response) => {
     this.attributes = res.json();

  
   }
  )
  }  

  // Set Delete Attribute
  setDeleteAttribute = (_id, Name) => {
    this.attributeIdToBeDeleted = _id;
    this.attributeNameToBeDeleted = Name;
  }

  // Delete Attribute
  deleteAttribute = (_id) => {

    this.attributeDataService.deleteAttribute(_id).subscribe(
      data => {
        if (data.success === true ) {
          this.appAttr(this.session_id);
          $('#deleteModal').modal('toggle');
          this.toastr.error('Attribute Deleted.');
          this._router.navigate(['/attributes']);
        } else if (data.success === false) {
          this.appAttr(this.session_id);
          $('#deleteModal').modal('toggle');
          this.toastr.error('Attribute Not Found. Refreshing The Attribute List.');
          this._router.navigate(['/attributes']);
        }
      },
      err => {
        this.appAttr(this.session_id);
        $('#deleteModal').modal('toggle');
   
        this._router.navigate(['/attributes']);
      }
    );
  }

  // Get All Applications

  getApplications = () => {
    this.attributeDataService.getAllApplications().subscribe(
      data => {
  
        this.applications = data;
        //this.toastr.info('Fetched Apllication List Successfully.');
      },
      err => {
  
        this.toastr.error('Something Went Wrong.');
      }
    );
  }

  // Add Attribute
  addNewAttribute = (attribute) => {


    
    if (attribute.Name===undefined||attribute.Name===null||attribute.Name==='') {
          this.toastr.error('Attribute name required.');
    } else {

       // tslint:disable-next-line:prefer-const
       let Obj_Attribute = {
        Name             : attribute.Name,
        Type             : attribute.Type,
        DataType         : attribute.DataType,
        Description      : attribute.Description,
        Application_Id   : this.session_id,
        Single_Multiple  : attribute.Single_Multiple
    };

      this.attributeDataService.addAttribute(Obj_Attribute).subscribe(
        res => {
    
                if(res._body=="unique") {
                  this.toastr.error('Attribute already exists.');
                }
                else {
                  this.appAttr(this.session_id);
                  $('#addModal').modal('toggle');
                  this.toastr.success('Attribute Added.');
                }

        },
        err => {
    
        }
      );
    }
  }

  // Edit Attribute
  editAttribute = (_id) => {

    this.attributeDataService.getAttributeById(_id).subscribe(
      data => {
        if (data.success === true) {
          this.uData = data.Attribute;
        } else if (data.success === false) {
          this.appAttr(this.session_id);
          //this.fetchData();
          $('#updateModal').modal('toggle');
          this.toastr.error('Attribute Not Found. Refreshing The Attribute List');
        }
      },
      err => {
        this.appAttr(this.session_id);
        //this.fetchData();
        $('#updateModal').modal('toggle');
        this.toastr.error('Something Went Wrong.');
      }
    );

    // this.getApplications();
  }

  // Update Attribute

  updateAttribute = (updateData, _id) => {

    if (updateData.Name===undefined||updateData.Name===null||updateData.Name==='') {
      this.toastr.error('Attribute name required.');
    } else {

    // tslint:disable-next-line:prefer-const
    let Obj_Attribute = {
      _id              : _id,
      Name             : updateData.Name,
      Type             : updateData.Type,
      DataType         : updateData.DataType,
      Description      : updateData.Description,
      Application_Id   : this.session_id,
      Single_Multiple  : updateData.Single_Multiple
      };

      this.attributeDataService.updateAttribute(Obj_Attribute).subscribe(
        data => {
          if (data.success === true) {
            $('#updateModal').modal('toggle');
            this._router.navigate(['/attributes']);
            this.appAttr(this.session_id);
            //this.fetchData();
            this.toastr.info('Attribute Updated.');
          } else if (data.success === false) {
            $('#updateModal').modal('toggle');
            this._router.navigate(['/attributes']);
            this.appAttr(this.session_id);
            //this.fetchData();
            this.toastr.error('Attribute Not Found. Refreshing The Attribute List.');
          }
        },
        err => {
          $('#updateModal').modal('toggle');
          this._router.navigate(['/attributes']);
          this.appAttr(this.session_id);
          //this.fetchData();
          this.toastr.error('Something Went Wrong.');
        }
      );
    }
  }

 

}
