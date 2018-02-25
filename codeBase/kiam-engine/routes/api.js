const express = require('express');

const router = express.Router();

const App = require('../models/app_schema');
const ResourceType = require('../models/resourceType_schema');
const Attribute = require('../models/attribute_schema');
const Role = require('../models/role_schema');
const Resource = require('../models/resource_schema');
const Policy = require('../models/policy_schema');
const PolicyTargetAction = require('../models/PolicyTargetActions_schema');
const User = require('../models/user_schema');

const AuthenticateUser = require('./functions/authenticateUser');
const PrincipalObjectCreation = require('./functions/principalObjectCreation');
const IdentifyingAttributes = require('./functions/identifyingAttributes');
const EvaluateUserAccess = require('./functions/evaluateUserAccess');
const GetFinalPolicy = require('./functions/getFinalPolicy');

router.post('/', (req, res) => {
    let requestObject = req.body;
    let userAuthenticated = false;
    let userExistsInLDAP = false;
    
    let environmentAttributes = [];
    let principalUser = requestObject.username;
    let principalRoles = [];
    let principalObject = {};
    
    let finalPolicies = [];

    let policyAttributes = [];
    let fixedPolicyAttributes = [];
    let dynamicPolicyAttributes = [];

    let pipAttributesToBeFetched = [];
    let pipAttributes = [];

    let filteredApplicablePolicies = [];

    let privilege = false;
    let finalPrivilege = false;

    let responseObject = requestObject;
    delete responseObject.password;

    let returnVariable = false;

//console.log(requestObject);
    AuthenticateUser.userExistsInKIAM(requestObject['username']).then((resp) => {
        returnVariable = resp;
        console.log("RESULT: " + returnVariable);
    
    }).then(() => {
        if(returnVariable == false) {
            
            console.log('User Does not Exists');
            
            AuthenticateUser.fetchUserDetailsFromUserStore(requestObject.username, requestObject.password).then((resp2) => {
                
                console.log("LDAP: " + resp2);

                if(resp2.exists == false){
                    
                    console.log('USER DOES NOT EXIST ANYWHERE');
                    res.send('USER DOES NOT EXIST ANYWHERE');
                
                }else if(resp2.exists == true){
                    
                    console.log('USER EXISTS IN LDAP');
                    let userProfileAttributes = [];
                    userExistsInLDAP = true;
                    userProfileAttributes = resp2.Attributes;

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
                        principalRoles = userProfileAttributes.Roles
                        principalObject['principalUser'] = principalUser;
                        principalObject['Roles'] = principalRoles;
                    //res.send('USER EXISTS IN LDAP');
                }

            });
          //  res.json({msg: "User Does Not Exist"});
        }
        if(returnVariable == true){
            console.log('User Does Exists');
            AuthenticateUser.Authenticate(requestObject.username, requestObject.password).then((resp) => {
                console.log("AUTHENTICATE KIAM: " + resp);
                
                if(resp == false){
                
                    console.log('USERNAME OR PASSWORD IS WRONG');
                    res.send('USERNAME OR PASSWORD IS WRONG');
                
                }else if(resp == true) {
                
                    console.log('USER AUTHENTICATED SUCCESSFULLY IN KIAM');
                   // res.send('USER AUTHENTICATED SUCCESSFULLY IN KIAM');
                    userAuthenticated = true;
                
                    AuthenticateUser.fetchUserDetailsFromKIAM(requestObject.username).then((resp) => {
                        console.log("USER DETAILS: " + JSON.stringify(resp));
                       // res.json({"USER AUTHENTICATED AND USER DETAILS ARE": resp});

                       let userProfileAttributes = [];
                       userProfileAttributes = resp;
                       
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
                }).then(() => {
                    PrincipalObjectCreation.fetchRolesForUser(principalUser).then((resp) => {
                        principalRoles = resp;
                        principalObject['principalUser'] = principalUser;
                        principalObject['Roles'] = principalRoles;
                    
                    });
                })
                    
                    
                }
            });
          //  res.json({msg: "User Does Exist"});
        }
    })
        function f(){

            console.log("THEN NEXT");
            console.log(userAuthenticated);
            console.log(userExistsInLDAP);

            if(userAuthenticated == true || userExistsInLDAP == true){
                
                GetFinalPolicy.getFinalPolicies(finalPolicies, principalRoles, requestObject.resource).then((resp) => {
                    finalPolicies = resp;
                    console.log('FINAL: ' + resp);
                }).then(() => {
                    console.log("GET POLICY CONSTRAINT ATTRIBUTE")
                    for(let i=0; i< finalPolicies.length; i++){
                        IdentifyingAttributes.getPolicyConstraintAttributes(finalPolicies[i]).then((resp) => {
                            
                            policyAttributes = resp;
                            console.log('POLICY ATTRIBUTE: ' + JSON.stringify(policyAttributes));
                            /*let policyConstraintAttributes = resp;
        
                            for(let j=0; j< policyConstraintAttributes.length; j++){
                                policyAttributes.push(policyConstraintAttributes[j]);
                            }*/
                            for(i=0; i<policyAttributes.length; i++){
                                if(policyAttributes[i].Type == 'Dynamic'){
                                 dynamicPolicyAttributes.push(policyAttributes[i]);
                                }else if(policyAttributes[i].Type == 'Fixed'){
                                 fixedPolicyAttributes.push(policyAttributes[i]);
                                }
                             }
                             console.log('DYNAMIC POLICY ATTRIBUTE: ' + JSON.stringify(dynamicPolicyAttributes));
                             console.log('FIXED POLICY ATTRIBUTE: ' + JSON.stringify(fixedPolicyAttributes));
                             
                             for(i=0; i < dynamicPolicyAttributes.length; i++){
                                 for(j=0; j < environmentAttributes.length; j++){
                                    let keyToBeChecked = Object.keys(environmentAttributes[j]);
                                    console.log(keyToBeChecked);
                                    for(k=0; k<keyToBeChecked.length; k++){
                                        if(dynamicPolicyAttributes[i].Name = key){
                                            dynamicPolicyAttributes.pop(dynamicPolicyAttributes[i]);
                                            break;
                                        }
                                    }
                                 }
                             }
                            pipAttributesToBeFetched = dynamicPolicyAttributes;
                            console.log("PIP ATTRIBUTES TO BE FETCHED: " + JSON.stringify(pipAttributesToBeFetched));
                            }).then(() => {
                                IdentifyingAttributes.retrieveAttributesFromPIP(pipAttributesToBeFetched).then((resp) => {
                                    pipAttributes = resp["elements"];
                                    console.log("FETCHED PIP ATTRIBUTES: " + JSON.stringify(pipAttributes));
                                    let keysToBeAdded = Object.keys(pipAttributes[0]);
            
                                    for(i=0; i<keysToBeAdded.length; i++){
                                       let key = keysToBeAdded[i];
                                       environmentAttributes[key] = pipAttributes[key];
                                    }
                                    
            
                                }).then(() => {

                                    
                                    console.log("Final Policies: " + finalPolicies.length);
                                    filteredApplicablePolicies = [];
                                    console.log("BEFORE filtered Applicable Policies: " + filteredApplicablePolicies);

                                    for(let i=0; i<finalPolicies.length; i++){  
                                        EvaluateUserAccess.evaluateConstraintForPolicy(finalPolicies[i], fixedPolicyAttributes, environmentAttributes).then((resp) => {
                                            console.log(resp);
                                            if(resp){
                                                console.log("Adding into Final Policies: " + i);
                                                filteredApplicablePolicies.push(finalPolicies[i]);
                                            }
                                        });
                                        
                                    }
                                    console.log("AFTER filtered Applicable Policies: " + filteredApplicablePolicies);

                                    console.log("FINAL POLICY AT I: " + finalPolicies);
                    
                                }).then(() => {
                                    
                                
                                        console.log("filtered Applicable Policies: " + JSON.stringify(filteredApplicablePolicies));
                                    for(i=0; i<requestObject.resource.length; i++){
                                        for(j=0; j<filteredApplicablePolicies.length; j++){
                                            let policyType = filteredApplicablePolicies[j].policy_type;
                    
                                            if(policyType == 'Deny'){
                                                privilege = false;
                                            }else {
                                                privilege = true;
                                            }
                                            let resource = requestObject.resource[i];
                                            let policy_id = filteredApplicablePolicies[j]['_id'];
                                            let evaluatePolicy = false;
                                            EvaluateUserAccess.evaluatePolicy(resource, policy_id).then((resp) => {
                                                evaluatePolicy = resp;
    
                                                if(evaluatePolicy == true && privilege == true){
                                                    finalPrivilege == true;
                                                }
                                                console.log("Policy Evaluation: " + evaluatePolicy);
                                                
                                            
                                            })
                                            
                                        }
                                        
                                        responseObject.resource[i]['privilege'] = finalPrivilege;
                                        console.log("RESPONSE OBJECT: " + JSON.stringify(responseObject.resource[i]));
                                    }
                    
                                })
                            })
                    }

                }).then(() => {
                    res.status(200).json(responseObject);
                })
    
            }

        };
        setTimeout(f,2500);
        


});

module.exports = router;
