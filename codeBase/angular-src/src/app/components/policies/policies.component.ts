import {Component,OnInit} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import {ToastrService, Toast} from 'ngx-toastr';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

declare var $;
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  //fetch all policies for the table  
  fetchedpolicies = [];

  //fetched roles and users and resources for selecting while adding policy
  allroles     = [] ; 
  allusers     = [] ;
  allresources = [];

  //form input models value declaration
  //policy  - data
  policy_name : String ;
  policy_type : String ;
  policy_constrains : String ;
  principaltype;
  pp ;
  pt ;

  //making policy principal data for sending to database
  principalsarray = [];

  //making policy targets data to add to target object 
  targetsarray = [];

  //show policy prinicpal !
  select: Boolean = false;
  selectpp: Boolean;

  constructor(public _http: Http, private toastr: ToastrService) {}
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  ngOnInit() {
    this.fetchPolicies();
    this.fetchRoles();
    this.fetchResources();
    this.fetchUsers();
    $(document).ready(function () {
      $('#dt').DataTable();
    });
  }

  refresh() {window.location.reload();}

  emptyarray(){
    this.select = false; 
    this.principalsarray = [] ; 
    this.targetsarray = [] 
  }

  fetchPolicies() {
    this._http.get("http://localhost:3000/api/policies").map(res => res.json()).subscribe(
      policies => this.fetchedpolicies = policies,
      err => console.log("error Occured while fetching Policies", err)
    )
  }

  fetchRoles() {
    this._http.get("http://localhost:3000/api/role/Roles").map(res => res.json()).subscribe(
      roles => this.allroles = roles,
      err   => this.toastr.error('error fetching the roles !',err)
    )
  }

  fetchUsers() {
    this._http.get("http://localhost:3000/api/users/all").map(res => res.json()).subscribe(
      users => this.allusers = users ,
      err   => this.toastr.error('error fetching all users',err)
    )
  }

  fetchResources(){
    this._http.get("http://localhost:3000/api/Fetch/Resource").map(res => res.json()).subscribe(
      resources => this.allresources = resources,
      err       => this.toastr.error('erroe fetchingall the resources',err)
    )
  }

  changeppvalue(value) {
    this.select = true;
    this.selectpp = value;
    this.principalsarray = [] ; 
    this.targetsarray = [] 
  }

  pushpolicyprincipal(){
    var fetchedprincipal = this.pp.split(',');
    this.principalsarray.push({id:fetchedprincipal[0],type:this.principaltype,name:fetchedprincipal[1]});
  }

  removepolicyprincipal(index){
    this.principalsarray.splice(index,1);
  }

  pushpolicytargets(){
    var fetchedtarget = this.pt.split(',');
    this.targetsarray.push({resource_id:fetchedtarget[0],resource_name:fetchedtarget[1]});
  }

  removepolicytarget(index){
    this.targetsarray.splice(index,1);
  }

  addPolicy(data){
    if ( data.policy_name === null || data.policy_name === undefined || data.policy_name === '' )
    {
      this.toastr.error("Policy name is requiered ! ")
    }
    else{
      let obj = {
        "application_id"        :   sessionStorage.getItem('app_id'),
        "policy_name"           :   data.policy_name ,
        "policy_type"           :   data.policy_type ,
        "policy_constrains"     :   data.policy_constrains,
        "policy_principals"     :   this.principalsarray,
        "policy_targets"        :   this.targetsarray
      }
        this._http.post("http://localhost:3000/api/addPolicy", obj ,{headers:this.headers})
          .subscribe(
            res => {
              if (res.status == 200){
                this.toastr.success('Policy added !' );
                this.fetchPolicies();
                this.emptyarray();
                $('#addModal').modal('toggle');
              }
              else this.toastr.error("the fields u entered were not propper !");
            },
            err => this.toastr.error('ops! there was an error adding the policy', err)
          )
    }
  }

  deletePolicy(id) {
    var q = confirm("do u want to delete this policy ?")
    if (q == true) {
      this._http.delete("http://localhost:3000/api/delPolicy/" + id).subscribe(
        res => {
          this.toastr.error('Policy Deleted !');
          this.fetchPolicies();
        },
        err => this.toastr.error('Ops! something went wrong.'))
      this.fetchPolicies();
      $('#dt').DataTable().clear();
      $('#dt').DataTable().draw();
    }
  }


}
