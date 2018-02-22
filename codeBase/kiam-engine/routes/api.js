const express = require('express');

const router = express.Router();

//#region Models and Functions

const App = require('../../server/models/App');
const ResourceType = require('../../server/models/resourceType_schema');
const Attribute = require('../../server/models/attribute_schema');
const Role = require('../../server/models/role_schema');
const Resource = require('../../server/models/resource_schema');
const Policy = require('../../server/models/policy_schema');
const PolicyTargetAction = require('../../server/models/PolicyTargetActions_schema');
const User = require('../../server/models/user_schema');

const AuthenticateUser = require('./functions/authenticateUser');
const PrincipalObjectCreation = require('./functions/principalObjectCreation');
const IdentifyingApplicablePolicies = require('./functions/identifyingApplicablePolicies');
const IdentifyingAttributes = require('./functions/identifyingAttributes');
const EvaluateUserAccess = require('./functions/evaluateUserAccess');

//#endregion
/*
let requestObject = {
    "username": req.body.username,
    "password": req.body.password,
    "resource": req.body.resource,
    "adusername": req.body.adusername,
    "teammateId": req.body.teammateId,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "businessEntity": req.body.businessEntity,
    "titleEntitlementProfileName": req.body.titleEntitlementProfileName,
    "titleAbbreviation": req.body.titleAbbreviation,
    "jobCode": req.body.jobCode,
    "jobTitle": req.body.jobTitle,
    "jobDescription": req.body.jobDescription
}*/

let requestObject = req.body;


router.get('/', (req, res) => {

//#region CHECKING USER AUTHENTICATION IN KIAM & LDAP + FETCHING USER PROFILE ATTRIBUTES

let userAuthenticated = false;
let environmentAttributes = [];
let principalUser = requestObject.username;
let principalRoles = [];
let principalObject = {};

if(!AuthenticateUser.userExistsInKIAM(requestObject.username)) {

    try{
        AuthenticateUser.fetchUserDetailsFromUserStore(requestObject.username, requestObject.password);
        // ALSO SAVE THIS INFO IN MONGO DB
    }catch(error){
        // RETUREN USER DOESN'T EXIST
    }

}else {
    userAuthenticated = AuthenticateUser.AuthenticateUser(requestObject.username, requestObject.password);

    if(userAuthenticated == false){
        // RETUREN User is not Authenticated
    }else{
        // RETUREN User is Authenticated
        
        let userProfileAttributes = [];

        userProfileAttributes = AuthenticateUser.fetchUserDetailsFromKIAM(requestObject.username);

        for(let i=0; i<userProfileAttributes.length; i++) {
            let profileAttribute = Object.keys(userProfileAttributes[i]);
            let key = profileAttribute[0];
            let value = userProfileAttributes[i][key];

            environmentAttributes.push(
                {
                    [key]: value
                }
            );
        }

        principalRoles = PrincipalObjectCreation.fetchRolesForUser(principalUser);
        principalObject['principalUser'] = principalUser;
        principalObject['Roles'] = principalRoles;

    }
}

//#endregion

//#region CREATING PRINCIPAL OBJECT
/*
let principalUser = requestObject.username;
let principalRoles = [];
let principalObject = {};

//principalRoles = fetchRolesForUser(principalUser);
principalRoles = PrincipalObjectCreation.fetchRolesForUser(principalUser);

principalObject['principalUser'] = principalUser;

principalObject['Roles'] = principalRoles;
*/
/*
for(let i=0; i<principalRoles.length; i++){
    principalObject['Role_'+ i] = principalRoles[i];
}*/
/*
let userProfileAttributes = [];
let environmentAttributes = [];

userProfileAttributes = PrincipalObjectCreation.fetchUserDetailsFromKIAM(principalUser);

for(let i=0; i<userProfileAttributes.length; i++) {
    let profileAttribute = userProfileAttributes[i];
    let value = userProfileAttributes[profileAttribute];

    environmentAttributes.push(
        {
            [profileAttribute]: value
        }
    );
}*/

//#endregion

//#region IDENTIFYING APPLICABLE POLICIES FOR ROLES

//let applicablePolicies = [];
let finalPolicies = [];
/*
for(let i=0; i< principalRoles.length; i++){
    applicablePolicies.push(IdentifyingApplicablePolicies.identifyPoliciesForPrincipalRoles(principalRoles[i]));
}

for(let i=0; i< requestObject.resource.length; i++){
    for(let j=0; j< applicablePolicies.length; j++){

        if(applicablePolicies[requestObject.resource[i]]){
            finalPolicies.push(applicablePolicies[j]);
        }
    }
}
*/
requestObject.resource.forEach(resource => {
    principalRoles.forEach(role => {
        Policy.find({role_name: role.role_name, resource_name: resource.resource_name}, (error, policy) => {
            err =>{},
            policy => {
                let alreadyExists = false;
                    for(let i=0; i< finalPolicies.length; i++){
                        if(finalPolicies[i].policy_name == policy.policy_name){
                            alreadyExists = true;
                            break;
                        }
                    }
                    if(alreadyExists == false){
                      finalPolicies.push(policy);
                    }
                }
            });
        })
    });


//#endregion

//#region IDENTIFY ATTRIBUTES REQUIRED FOR FINAL POLICIES

let policyAttributes = [];
let fixedPolicyAttributes = [];
let dynamicPolicyAttributes = [];

for(let i=0; i< finalPolicies.length; i++){
    let policyConstraintAttributes = IdentifyingAttributes.getPolicyConstraintAttributes(finalPolicies[i]);
    
    for(let j=0; j< policyConstraintAttributes.length; j++){
        policyAttributes.push(policyConstraintAttributes[j]);
    }
}

//Some array operations. A Function Needs To Be Created!
//dynamicPolicyAttributes = policyAttributes - fixedPolicyAttributes;

policyAttributes.forEach(attribute => {
   if(attribute.Type == 'Dynamic'){
    dynamicPolicyAttribute.push(attribute);
   }
});


//Identify attributes to be fetched from PIP for the user
let pipAttributesToBeFetched = [];
let pipAttributes = [];

// environmentAttributes HAS ALREADY BEEN DEFINED ABOVE BUT THE RESON FOR DOING THE STEP BELOW
// IS SO THAT THE ATTRIBUTES THAT HAS NOT BEEN SENT ALONG WITH THE REQUEST ARE ADDED TO THE
// environmentAttributes List.

/*
pipAttributesToBeFetched = dynamicPolicyAttributes;
environmentAttributes.forEach(envAttribute => {
    dynamicPolicyAttributes.forEach(dynamicAttribute => {
        let keyToBeChecked = Object.keys(envAttribute);
        if(keyToBeChecked == dynamicAttribute.name){
            pipAttributesToBeFetched.pop(dynamicAttribute.name);
        }
    });
});*/

// A Function Needs To Be Created! Whatever Values still null needs to be fetched from the PIP Database
pipAttributesToBeFetched = dynamicPolicyAttributes - environmentAttributes;

pipAttributes = IdentifyingAttributes.retrieveAttributesFromPIP(pipAttributesToBeFetched);

for(let i=0; i< pipAttributes.length; i++){
    let attributeToBeAdded = Object.keys(pipAttributes[i]);
    let key = attributeToBeAdded[0];
    let value = pipAttributes[i][key];
    /*environmentAttributes.push(
        {
            [key]: value 
        }
    )*/
    environmentAttributes[key] = value;
}

//#endregion

//#region CREATING RESPONSE OBJECT AND EVALUATING USER ACCESS
/*
let responseObject = {
    resources: []
}
*/
let responseObject = requestObject;

delete responseObject.username;

// BELOW GIVEN IS JUST AN SYNTACTICAL EXAMPLE TO HELP THE DEVELOPER WHEN HE/SHE IS IMPLEMENTING THE LOGIC
// FOR ADDING Resource Return Attributes
// responseObject.resource['resource_retuen_attributes'] = resource_returned_attribute;

// Filter applicable Policies based on conditions
//i.e further flter policy based on evaluation of text constraint as true or false

let filteredApplicablePolicies = [];

for(let i=0; i<finalPolicies.length; i++){
    if(EvaluateUserAccess.evaluateConstraintForPolicy(finalPolicies[i],environmentAttributes)){
        filteredApplicablePolicies.push(finalPolicies[i]);
    }
}

//Evaluate whether user should have
let privilege = false;
let finalPrivilege = false;

for(i=0; i<requestObject.resource.length; i++){

    for(j=0; j<filteredApplicablePolicies.length; j++){
       // let policyType = EvaluateUserAccess.getPolicyType(filteredApplicablePolicies[j]);

        let policyType = filteredApplicablePolicies[j].policy_type;

        if(policyType == 'Deny'){
            privilege = false;
        }else {
            privilege = true;
        }

        let resourceAction = requestObject.resource.action;
        let evaluatePolicy = EvaluateUserAccess.evaluatePolicy(requestObject.resource, resourceAction, filteredApplicablePolicies[j]);

        if(evaluatePolicy == true && privilege == true){
            finalPrivilege == true;
        }
        
      //  let resourceToBeAdded = requestObject.resource[i];
      //  responseObject['resource'] = requestObject.resource[i];
      //  responseObject['finalPreviledge'] = finalPrivilege;

        //EvaluateUserAccess.addToResponseObject(requestObject.resource[i], finalPrivilege);
       /* responseObject.resource.push({
            resource: requestObject.resource[i],
            finalPrivilege: finalPrivilege
        })*/
        //NOW SEND THE RESPONSE
        
        responseObject.resource[i]['priviledge'] = finalPrivilege;

    }
}

//res.status(200).json(responseObject);
//#endregion

});
