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
  fetchpolicyurl  = 'http://localhost:3000/api/policy/'
  deletepolicyurl = 'http://localhost:3000/api/delPolicy/'
  updatepolicyurl = 'http://localhost:3000/api/updatePolicy'
  addpolicytargetactionsurl= 'http://localhost:3000/api/addPolicyTargetActions'
  updatepolicytargetactionsurl= 'http://localhost:3000/api/updatePolicyTargetActions'
  fetchresourcebyidurl = "http://localhost:3000/api/Resource/"
  fetchresourcetypebyidurl = 'http://localhost:3000/api/resourceType/'

  policies = [];

  allresources = [];
  allroles = [];

  fetchedresourcename ;
  fetchedrestype ;
  fetchedrestypeactions = []
  fetchedrestypeid;
  restypename;

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
       $('#dt').DataTable();
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
        this.allroles = res.json();
        //console.log(this.allroles);
       // console.log(this.role.Application_id)
      }
    )
   }
//Fetch Resources
fetchResources=function() {
  this._http.get("http://localhost:3000/api/Fetch/Resource").subscribe(
    (res: Response) => {
      this.allresources = res.json();
      //console.log(this.allresources);
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
                  this.roles = this.policy.policy_principals;
                  this.resources = this.policy.policy_targets
                  var rls = this.policy.policy_principals;
                  var ress = this.policy.policy_targets;
                  var i,j ;
                  for (i=0;i<rls.length;i++)
                  {
                    this.rolesnamearr.push(rls[i].role_name);
                    this.roleidarr.push(rls[i].role_id);
                  }
                  for (j=0;j<ress.length;j++)
                  {
                    this.resnamearr.push(ress[j].resource_name);
                    this.residarr.push(ress[j].resource_id);
                  }
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
                $('#addModal').modal('toggle');
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
    if(this.roles == [] && this.resources == [])
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
    this.resources.splice(index,1)
    this.resnamearr.splice(index,1)
    this.residarr.splice(index,1)
  }

  //Refresh Page
  refresh = function() {
    window.location.reload();
   }
   
  emptyarr()
  {
    this.roleidarr = [];
    this.rolesnamearr = [];
    this.residarr = [];
    this.resnamearr = [];
  }

  //fetch all resources on this function !
  openPolicyta(id){
    console.log(id)
    this._http.get(this.fetchresourcebyidurl + id)
    .subscribe( res => {
      var obj = res.json();
      this.fetchedrestypeid = obj.Resource_typeid;
      this.fetchedresourcename = obj.res_name;
      this._http.get(this.fetchresourcetypebyidurl + this.fetchedrestypeid) 
      .subscribe(
        res => {
          this.fetchedrestype = res.json();
          this.restypename = this.fetchedrestype.resourceType_name
          this.fetchedrestypeactions = this.fetchedrestype.resourceType_actions
          console.log(this.fetchedrestype);
          console.log(this.fetchedrestypeactions)
        }
      )
    })
  }

  //addpolicytargetactions function 
  addpolicytargetactions(data){
    var i;
    var actions = [];
    var actionsname = []
    var actionstate = []
    for (let a of Object.keys(data))
    {
      actionsname.push(a)
    }
    for (let s of (<any>Object).values(data))
    {
      actionstate.push(s)
    }
    for(i=0;i<actionsname.length;i++)
    {
      actions.push({action_name:actionsname[i] , action_state : actionstate[i] })
    }

    let ptaobj ={
      policy_Id : this.policy_id,
      resourceType_Id: this.fetchedrestypeid ,
      resourceType_name: this.restypename,
      resourceType_actions: actions
    }
    console.log(ptaobj)
    this._http.post(this.addpolicytargetactionsurl,ptaobj,{headers:this.headers})
    .subscribe( res => this.toastr.success("Target Action Saved !"),
      err => this.toastr.error("ops! Something Went Wrong !")
  )
  }



}
