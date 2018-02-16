import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

declare var $;
 

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  policiesurl     = 'http://localhost:3000/api/policies'
  addpolicyurl    = 'http://localhost:3000/api/addPolicy'
  fetchpolicyurl  = 'http://localhost:3000/api/'
  deletepolicyurl = 'http://localhost:3000/api/delPolicy/'
  updatepolicyurl = 'http://localhost:3000/api/updatePolicy'
  addpolicytargetactionsurl= 'http://localhost:3000/api/addPolicyTargetActions'
  updatepolicytargetactionsurl= 'http://localhost:3000/api/updatePolicyTargetActions'

  policies = [];

  policy;
  
  role:String;
  roles = [];
  rolesnamearr = [];
  roleidarr=[];

  resource:String;
  resources = [];
  resnamearr = [];
  residarr = [];

  policy_id :String;
  policy_name :String;
  policy_type : String;
  policy_constrains:String;

  select:Boolean = false;

  constructor(public _http:Http,private toastr: ToastrService ) { }

  private headers = new Headers({ 'Content-Type': 'application/json'});

  ngOnInit() {
    this.fetchPolicies();
    this.fetchRoles();
    this.fetchResources();
    $(document).ready(function(){ 
       $('#dtbl').DataTable();
    });
  }

  fetchPolicies() {
    this._http.get(this.policiesurl)
    .map(res => res.json())
    .subscribe(
      policies => {this.policies = policies;} ,
      err => console.log("error Occured while fetching Policies" , err)
    );
  }
//Fetch Roles
  fetchRoles=function() {
    this._http.get("http://localhost:3000/api/role/Roles").subscribe(
      (res: Response) => {
        this.roles = res.json();
        console.log(this.roles);
       // console.log(this.role.Application_id)
      }
    )
   }
//Fetch Resources
fetchResources=function() {
  this._http.get("http://localhost:3000/api/Fetch/Resource").subscribe(
    (res: Response) => {
      this.resources = res.json();
      console.log(this.resources);
    }
  )
 }

  editPolicy(id) {
    this._http.get(this.fetchpolicyurl + id)
              .subscribe( 
                res => { 
                  this.policy = res.json();
                  console.log(this.policy);
                  this.policy_id = this.policy._id;
                  this.policy_name = this.policy.policy_name;
                  this.policy_type = this.policy.policy_type;
                  this.policy_constrains = this.policy.policy_constrains;
                });
  }

  addPolicy(data){
    var i,j;
    for(i=0;i<this.rolesnamearr.length;i++)
    {
      this.roles.push({role_id:this.roleidarr[i],role_name:this.rolesnamearr[i]})
    }
    for(j=0;j<this.resnamearr.length;j++)
    {
      this.resources.push({resource_id:this.residarr[j],resource_name:this.resnamearr[j]})
    }
    let obj = {
      policy_name : data.policy_name,
      policy_type : data.policy_type,
      policy_constrains : data.policy_constrains,
      policy_principals : this.roles,
      policy_targets : this.resources
    }
    console.log(obj)
    if(data.policy_name == undefined || data.policy_type == undefined || data.policy_constrains == undefined )
    {
      alert('all fields are requiered !');
    }
    else
    {
      this._http.post( this.addpolicyurl , obj , {headers : this.headers } )
                .subscribe(res => {
                  this.fetchPolicies();
                });
                this.toastr.success('Policy Added.');
    }
    this.rolesnamearr = [];
    this.roleidarr=[];
    this.residarr=[];
    this.resnamearr = [];
  }

  updatePolicy(data,id){
    var i,j;
    for(i=0;i<this.rolesnamearr.length;i++)
    {
      this.roles.push({role_id:this.roleidarr[i],role_name:this.rolesnamearr[i]})
    }
    for(j=0;j<this.resnamearr.length;j++)
    {
      this.resources.push({resource_id:this.residarr[j],resource_name:this.resnamearr[j]})
    }
    const objwppapt = {
      _id         : this.policy_id,
      policy_name : data.policy_name,
      policy_type : data.policy_type,
      policy_constrains : data.policy_constrains,
      policy_principals : this.roles,
      policy_targets : this.resources
    };
    const obj = {
      _id         : this.policy_id,
      policy_name : data.policy_name,
      policy_type : data.policy_type,
      policy_constrains : data.policy_constrains
    }
    if(this.roles == null && this.resources == null)
    {
      this._http.put(this.updatepolicyurl, obj , {headers:this.headers})
              .subscribe(
                respon => {this.toastr.success('updated policy sucessfully!');this.fetchPolicies()},
                err => this.toastr.error("opps! smthing went wrong !") 
              )
    }
    else
    {
      this._http.put(this.updatepolicyurl, objwppapt , {headers:this.headers})
              .subscribe(
                respon => {this.toastr.success('updated policy sucessfully! with the new policy principals and policy targets !');this.fetchPolicies()},
                err => this.toastr.error("opps! smthing went wrong !") 
              )
    }
    
  }

  deletePolicy(id){
    var q = confirm("do u want to delete this policy ?")
    if (q==true)
    {
      this._http.delete(this.deletepolicyurl+id)
              .subscribe( 
              res => {this.toastr.error('Policy Deleted !');this.fetchPolicies(); }, 
              err => this.toastr.error('Ops! something went wrong.')
            )
      this.fetchPolicies();
    }
  }

  loadPolicy(id){
    this._http.get(this.fetchpolicyurl + id)
    .subscribe( 
      res => { 
        this.policy = res.json();
        console.log(this.policy);
        this.policy_id = this.policy._id;
        this.policy_name = this.policy.policy_name;
        this.policy_type = this.policy.policy_type;
        this.policy_constrains = this.policy.policy_constrains;
        this.roles = this.policy.policy_principals;
        this.resources = this.policy.policy_targets;
      });

  }

  addpp(){
    var name = this.role.split(',');
    this.rolesnamearr.push(name[1])
    this.roleidarr.push(name[0])
  }

  rmpp(index){
    this.rolesnamearr.splice(index,1)
    this.roleidarr.splice(index,1)
  }

  addpt(){
    var name = this.resource.split(',');
    this.resnamearr.push(name[1])
    this.residarr.push(name[0])
  }

  rmpt(index){
    this.resnamearr.splice(index,1)
    this.residarr.splice(index,1)
  }

  //fetch all resources on this function !
  openPolicyta(id){
    this._http.get(this.fetchpolicyurl + id)
    .subscribe( 
      res => { 
        this.policy = res.json();
        console.log(this.policy);
        this.policy_id = this.policy._id;
        this.policy_name = this.policy.policy_name;
        this.policy_type = this.policy.policy_type;
        this.policy_constrains = this.policy.policy_constrains;
        this.roles = this.policy.policy_principals;
        this.resources = this.policy.policy_targets;
      })
    //fetch res type and load them in strings 
  }

  //addpolicytargetactions function 
  addpolicytargetactions(data){
    let ptaobj ={
      policy_Id : '',
      resourceType_Id: '' ,
      resourceType_name: '',
      resourceType_actions: '',

    }
    this._http.post(this.addpolicytargetactionsurl,ptaobj,{headers:this.headers})
  }

}
