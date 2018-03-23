import {fetch_policy_url,fetch_roles_url,fetch_users_url,fetch_resource_url,fetch_policyById_url,add_policy_url,add_targets_url,update_policy_url,delete_policy_url,get_res_type_actions_url} from '../../routeConfig';
import {Component,OnInit, Input} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import {ToastrService, Toast} from 'ngx-toastr';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { LoadingModule } from 'ngx-loading';

declare var $;
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  public loading = false;
  app_id = sessionStorage.getItem('app_id') ;
  
  //fetch all policies for the table  
  fetchedpolicies = [];

  //fetched policy for edit
  fetchedpolicy ;

  //fetched roles and users and resources for selecting while adding policy
  allroles     = [] ; 
  allusers     = [] ;
  allresources = [];

  //form input models value declaration
  //policy  - data
  policy_id   : String ;
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

  SingleTargetResource;
  singletargetactions  = [] ;
  SingleTargetResourceName ;

  actions ;

  //show policy prinicpal !
  select: Boolean = false;
  selectpp: Boolean;

  constructor(public _http: Http, private toastr: ToastrService) {}
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  p: number = 1;
  collection: any[] = this.fetchedpolicies;  
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.fetchPolicies();
    this.fetchRoles();
    this.fetchResources();
    this.fetchUsers();
  }

  refresh() {window.location.reload();}

  emptyarray(){
    this.select = false; 
    this.principalsarray = [] ; 
    this.targetsarray = [] 
  }

  fetchPolicies() {
    this.loading = true;
    this._http.get(fetch_policy_url + this.app_id).map(res => res.json()).subscribe(
      policies => {
        this.loading = false;
        this.fetchedpolicies = policies
      },
       err => console.log("error Occured while fetching Policies", err)
    )
  }

  fetchRoles() {
    this._http.get(fetch_roles_url + this.app_id).map(res => res.json()).subscribe(
      roles => this.allroles = roles,
      err   => this.toastr.error('error fetching the roles !',err)
    )
  }

  fetchUsers() {
    this._http.get(fetch_users_url).map(res => res.json()).subscribe(
      users => this.allusers = users ,
      err   => this.toastr.error('error fetching all users',err)
    )
  }

  fetchResources(){
    this._http.get(fetch_resource_url + this.app_id ).map(res => res.json()).subscribe(
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
        "application_id"        :   this.app_id,
        "policy_name"           :   data.policy_name ,
        "policy_type"           :   data.policy_type ,
        "policy_constrains"     :   data.policy_constrains,
        "policy_principals"     :   this.principalsarray,
        "policy_targets"        :   this.targetsarray
      }
        this._http.post(add_policy_url, obj ,{headers:this.headers})
        .map(res => res.json())
          .subscribe(
            res => {
              if (res.message == "unique" ){
                this.toastr.error('Policy Name Should be Unique');
              }
              if(res.state == 200 ){
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
      this._http.delete(delete_policy_url + id).subscribe(
        res => {
          this.toastr.error('Policy Deleted !');
          this.fetchPolicies();
        },
        err => this.toastr.error('Ops! something went wrong.'))
        this.fetchPolicies();
        this.emptyarray();
    }
  }

  editPolicy(id){
    this._http.get(fetch_policyById_url + id).map(res => res.json()).subscribe(res => {
        this.fetchedpolicy = res;
        this.select = true;
        this.policy_id = this.fetchedpolicy._id;
        this.policy_name = this.fetchedpolicy.policy_name;
        this.policy_type = this.fetchedpolicy.policy_type;
        this.policy_constrains = this.fetchedpolicy.policy_constrains;
        this.principalsarray =  this.fetchedpolicy.policy_principals;
        this.targetsarray = this.fetchedpolicy.policy_targets
      });
  }

  updatePolicy(id,formdata){
    let updtobj = {
      "_id"                   :   id,
      "application_id"        :   this.app_id,
      "policy_name"           :   this.policy_name ,
      "policy_type"           :   this.policy_type ,
      "policy_constrains"     :   this.policy_constrains,
      "policy_principals"     :   this.principalsarray,
      "policy_targets"        :   this.targetsarray
    }
    if(updtobj.policy_name != ('' || undefined) ){
      this._http.put(update_policy_url, updtobj, {headers: this.headers})
      .subscribe(
        respon => {
          if(respon.status == 200) {
            this.toastr.info('updated policy sucessfully!');
            $('#editModal').modal('toggle');
            this.fetchPolicies();
            this.emptyarray();
          }
          else{
            this.toastr.error("the fields u entered were not propper !")
          }
        }, 
        err => {this.toastr.error("opps! smthing went wrong !"); this.emptyarray();} )
    }
    else{
      this.toastr.error("policy name is required !")
    }

  }

  loadtargetactions(id){
    this._http.get(fetch_policyById_url + id).map(res => res.json()).subscribe(res => {
      this.fetchedpolicy = res;
      this.policy_id = this.fetchedpolicy._id;
      this.policy_name = this.fetchedpolicy.policy_name;
      this.policy_type = this.fetchedpolicy.policy_type;
      this.policy_constrains = this.fetchedpolicy.policy_constrains;
      this.principalsarray =  this.fetchedpolicy.policy_principals;
      this.targetsarray = this.fetchedpolicy.policy_targets      
    });
  }

  addTarget(data){
    this.singletargetactions = data.resourceType_actions;
    this.SingleTargetResourceName = data.resource_name ;
    this.SingleTargetResource = data;
    $('#info').modal('toggle');
    this.fetchrestypeactions(data.resourceType_Id)
  }

  fetchrestypeactions(id){
    this._http.get(get_res_type_actions_url + id ).map(res => res.json()).subscribe(
      res => { this.actions = res.policy_targets[0].resourceType_actions ; } , 
      err => { console.log(err) }
    )
  }

  pushtarget(id,singleresource,name,state){    
    let data = { 'policyid' : id , 'resourcetypeid' : singleresource.resourceType_Id  , 'name' : name , 'state' : state };
    this._http.put(add_targets_url , data , { headers : this.headers } ).subscribe(
      res => {
        let rspns = res.json()
        if (res.status == 200 && rspns.success == true ){
          this.toastr.success('action status updated !' );
          // this.fetchPolicies();
          this.emptyarray();
          this.fetchrestypeactions(singleresource.resourceType_Id)
        }
        else {
          this.toastr.error("actions were not updated !");
        }
      },
      err => this.toastr.error('ops! there was an error adding the target actions', err)
    )
  }

}
