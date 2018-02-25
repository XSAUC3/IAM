import { ResourceTypesComponent } from './../resource-types/resource-types.component';
import { AttributeDataService } from './services/attribute-data.service';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
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

  constructor(private _router: Router,
              private http: Http,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private attributeDataService: AttributeDataService) {}

  ngOnInit() {

  //  this.fetchData();

    $(document).ready(() => {
       $('#dt').DataTable();
  });

    this.fetchData();
    this.getApplications();
  }

  // Fetch All Attributes
  fetchData = () => {
    this.attributeDataService.getAllAttributes().subscribe(
      data => {
        this.attributes = data.Attributes;
        console.log(this.attributes);
        //this.toastr.success('Attributes Fetched Successfully.');
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
          this.fetchData();
          $('#deleteModal').modal('toggle');
          this.toastr.error('Attribute Deleted.');
          this._router.navigate(['/attributes']);
        } else if (data.success === false) {
          this.fetchData();
          $('#deleteModal').modal('toggle');
          this.toastr.error('Attribute Not Found. Refreshing The Attribute List.');
          this._router.navigate(['/attributes']);
        }
      },
      err => {
        this.fetchData();
        $('#deleteModal').modal('toggle');
        this.toastr.error('Something Went Wrong.');
        this._router.navigate(['/attributes']);
      }
    );
  }

  // Get All Applications

  getApplications = () => {
    this.attributeDataService.getAllApplications().subscribe(
      data => {
        console.log(data);
        this.applications = data;
        //this.toastr.info('Fetched Apllication List Successfully.');
      },
      err => {
        console.log(err);
        this.toastr.error('Something Went Wrong.');
      }
    );
  }

  // Add Attribute
  addNewAttribute = (attribute) => {

    if (attribute.Name === (undefined || null) ||
        attribute.Type === (undefined || null) ||
        attribute.DataType === (undefined || null) ||
        attribute.Description === (undefined || null) ||
        attribute.Application_Id === (undefined || null) ||
        attribute.Single_Multiple === (undefined || null)) {
          this.toastr.error('Please Provide All The Necessary Fields.');
    } else {

       // tslint:disable-next-line:prefer-const
       let Obj_Attribute = {
        Name             : attribute.Name,
        Type             : attribute.Type,
        DataType         : attribute.DataType,
        Description      : attribute.Description,
        Application_Id   : attribute.Application_Id,
        Single_Multiple  : attribute.Single_Multiple
    };

      this.attributeDataService.addAttribute(Obj_Attribute).subscribe(
        data => {
          if (data.success === true) {
            this.fetchData();
            $('#addModal').modal('toggle');
            this.toastr.success('Attribute Added.');
          } else if (data.success === false) {
            this.fetchData();
            $('#addModal').modal('toggle');
            this.toastr.error('Something Went Wrong.');
          }
        },
        err => {
            this.fetchData();
            $('#addModal').modal('toggle');
            this.toastr.error('Something Went Wrong.');
            console.log(err);
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
          console.log(data);
        } else if (data.success === false) {
          this.fetchData();
          $('#updateModal').modal('toggle');
          this.toastr.error('Attribute Not Found. Refreshing The Attribute List');
        }
      },
      err => {
        this.fetchData();
        $('#updateModal').modal('toggle');
        this.toastr.error('Something Went Wrong.');
      }
    );

    // this.getApplications();
  }

  // Update Attribute

  updateAttribute = (updateData, _id) => {

    if (_id === (undefined || null) ||
        updateData.Name === (undefined || null) ||
        updateData.Type === (undefined || null) ||
        updateData.DataType === (undefined || null) ||
        updateData.Description === (undefined || null) ||
        updateData.Application_Id === (undefined || null) ||
        updateData.Single_Multiple === (undefined || null)) {
      this.toastr.error('Please Provide All The Necessary Fields.');
    } else {

    // tslint:disable-next-line:prefer-const
    let Obj_Attribute = {
      _id              : _id,
      Name             : updateData.Name,
      Type             : updateData.Type,
      DataType         : updateData.DataType,
      Description      : updateData.Description,
      Application_Id   : updateData.Application_Id,
      Single_Multiple  : updateData.Single_Multiple
      };

      this.attributeDataService.updateAttribute(Obj_Attribute).subscribe(
        data => {
          if (data.success === true) {
            $('#updateModal').modal('toggle');
            this._router.navigate(['/attributes']);
            this.fetchData();
            this.toastr.info('Attribute Updated.');
          } else if (data.success === false) {
            $('#updateModal').modal('toggle');
            this._router.navigate(['/attributes']);
            this.fetchData();
            this.toastr.error('Attribute Not Found. Refreshing The Attribute List.');
          }
        },
        err => {
          $('#updateModal').modal('toggle');
          this._router.navigate(['/attributes']);
          this.fetchData();
          this.toastr.error('Something Went Wrong.');
        }
      );
    }
  }

  addFilters = (filter) => {

    if (filter.Name === null &&
        filter.Type === null &&
        filter.DataType === null) {

          this.fetchData();

          this.filterApplied = false;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name !== null &&
               filter.Type === null &&
               filter.DataType === null) {
          this.attributeDataService.filterByName(filter.Name).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name === null &&
               filter.Type !== null &&
               filter.DataType === null) {
          this.attributeDataService.filterByType(filter.Type).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name === null &&
               filter.Type === null &&
               filter.DataType !== null) {
          this.attributeDataService.filterByDataType(filter.DataType).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name !== null &&
               filter.Type !== null &&
               filter.DataType === null) {
          this.attributeDataService.filterByNameType(filter.Name, filter.Type).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name === null &&
               filter.Type !== null &&
               filter.DataType !== null) {
          this.attributeDataService.filterByTypeDataType(filter.Type, filter.DataType).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name !== null &&
               filter.Type === null &&
               filter.DataType !== null) {
          this.attributeDataService.filterByDataTypeName(filter.DataType, filter.Name).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;

    } else if (filter.Name !== null &&
               filter.Type !== null &&
               filter.DataType !== null) {
          this.attributeDataService.filterByNameTypeDataType(filter.Name, filter.Type, filter.DataType).subscribe(
            data => {
              if (data.success === true) {
                console.log(data.Attributes);
                this.filteredAttributes = data.Attributes;
              } else if (data.success === false) {
                console.log(data.msg);
                this.filteredAttributes = data.Attributes;
              }
            },
            err => {
              console.log(err);
            }
          );

          this.filterApplied = true;
          this.filterName = filter.Name;
          this.filterType = filter.Type;
          this.filterDataType = filter.DataType;
    }


  }

}
