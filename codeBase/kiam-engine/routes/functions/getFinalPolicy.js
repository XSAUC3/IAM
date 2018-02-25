const mongoose = require('mongoose');
const Policy = require('../../models/policy_schema');

async function FinalPolicy(role, resource) {
  let policy = await (Policy.find({policy_principals: {$elemMatch: {role_name: role}},policy_targets: {$elemMatch: {resource_id: resource.resource_id}}}, (error, policy) => {
        if(error){

        }else if(policy.length == 0){
           // console.log("NULL: " + policy);
        }else if(policy.length > 0){
           // console.log("POLICY: " + policy);
        }
    }));
//console.log("FUNCTION POLICY: " + policy);
    return policy;
}

module.exports.getFinalPolicies = async (finalPolicies, roles, resources) => {
    

    let Roles = [];
    Roles = roles;
    let Resources = []; 
    Resources = resources;
    let FinalPolicies = [];

    for(i=0; i< Resources.length; i++){
        for(j=0; j< Roles.length; j++){
            
                try{
                    var policy = await FinalPolicy(Roles[j], Resources[i]);
                    console.log('Found Policy: ' + policy);
                }catch(ex){
                    console.log(ex);
                }
                
            let alreadyExists = false;

                for(let i=0; i< finalPolicies.length; i++){
                    if(finalPolicies[i].policy_name == policy.policy_name || policy.policy_name == undefined){
                        alreadyExists = true;
                        break;
                    }
                }  
                if(alreadyExists == false){
                    FinalPolicies.push(policy);
                   // console.log('Policy To Be Pushed: '+ JSON.stringify(policy));
                }
            }
        
    }

    /*resources.forEach(resource => {
        roles.forEach(role => {
            
                var policy = FinalPolicy(role, resource);
 
                
        
            });
        });
        */
       console.log('Finale :' + FinalPolicies);
return FinalPolicies; 
}