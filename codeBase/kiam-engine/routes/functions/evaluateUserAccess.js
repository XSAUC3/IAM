
//const mongoose = require('mongoose');
const Attribute = require('../../models/attribute_schema');
const PolicyTargetActions = require('../../models/PolicyTargetActions_schema');
const Policy = require('../../models/policy_schema');
//const config = require('../../../server/config/database');
/*
// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});
*/

//#region FUNCTIONS FOR CREATING RESPONSE OBJECT AND EVALUATING USER ACCESS

module.exports.evaluateConstraintForPolicy = async (policy, fixedPolicyAttributes, environmentAttributes) => {
    //RETURN TRUE or FALSE BASED on Constraint
    // CHINMAY
    // GET THE POLICY CONSTRAINT
    // CHECK IF THE #variables exist in fixedPolicyAttributes or environmentAttributes
    // IF #variable exists REPLACE VALUE OF #varible WITH It's VALUE FROM fixedPolicyAttributes or environmentAttributes
    //  CHECK Policy Constraint given IS TRUE or FALSE;
    // return True or False
  /*  var PolicyConstrainVariablesArray = [];
        var regexp = new RegExp('#([^\s]*)', 'g');
        var policylist = policy[0].policy_constrains.match(regexp);
        for (var p in policylist) {
            var hashSub = policylist[ p ].split('#');
            for (var x in hashSub) {
                if (hashSub[x] != "")
                {
                    if (hashSub[x].substr(hashSub[x].length - 1) == ":")
                    {
                        hashSub[x] = hashSub[x].slice(0, -1);
                    }
                    if (hashSub[x] != "") {
                        PolicyConstrainVariablesArray.push(hashSub[x]);
                    }
                }
            }
            for(v in PolicyConstrainVariablesArray)
            {
                if (v = process.env.v ) return true;
                else return false ;  
            }
        }*/

        return true;

}


async function FindActionState(_id, action){
    let returnvar = null;
    let state = await (PolicyTargetActions.findOne({ policy_Id: _id, resourceType_actions: {$elemMatch: {action_name: action}}}, (err, actionState) => {

    }));

    if(state == null){
        returnvar = false;
    }else{
        returnvar = true;
    }

    return returnvar;
}

async function FindResource(_id){

    let exists = false;

    let resource = await (Policy.findOne({policy_targets: {$elemMatch: {resource_id: _id}}}, (err, resource) => {

    }));

    if(resource == null || resource == undefined){
        exists = false;
    }else if(resource != null){
        exists = true;
    }
   // console.log(exists);
    return exists;
}

module.exports.evaluatePolicy = async (resource, policy_id) => {
    
    // RETURN TRUE or FALSE
    // CHINMAY

    var per = false

    let Resource = await FindResource(resource.resource_id);
    
    if(Resource == false){
        //console.log("NULL: " + Resource);
    }else if (Resource == true) {
        console.log("RESOURCE: " + Resource);
        var actionState = await FindActionState(policy_id, resource.action);
        console.log(actionState);
    }
        if (actionState == true ){
            per = true;
        console.log('ACTION STATE: ' + actionState)
        }    
        else if (actionState == false){
            per = false ;
        console.log('ACTION STATE: ' + actionState)
        }
console.log(per);
    return per;

}

//console.log(module.exports.evaluatePolicy('{"resource_id": "5a922d8a13c6a92ac8f45e9f", "action": "Write" }', '5a922da513c6a92ac8f45ea2'))

//#endregion