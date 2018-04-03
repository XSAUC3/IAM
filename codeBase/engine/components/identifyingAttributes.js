const mongoose = require('mongoose');
const Attribute = require('../models/attribute_schema');
const Resource = require('../models/resource_schema');
var Fuse = require('fuse.js');
var hashTable = require('node-hashtable');


// load evaluatePolicy function
const EvaluatePolicyConstraint = require('./evaluatePolicy');
async function FindAttribute(attribute){
    let foundAttribute = await (Attribute.findOne({'Name': attribute},{Name: 1,_id: 1,Type: 1}, function(err, attribute) {
        if(err) console.log(err);
        
    }));
    return foundAttribute;
}

 async function FindResource(_id){
    // let foundResource = await (Resource.findOne({attributes:{$elemMatch:{'attribute_id':_id}}},{"attributes.attribute_value":1,"_id":0},function(err,data) {
    //     if(err) console.log(err);
    //  }));

    //let foundResource = await (Resource.findOne({application_id:app_id,_id:res_id'attributes.attribute_id': _id.toString()},{'attributes.attribute_value':1,'_id':0},function(err, result) {
//         if(err) console.log(err);
        
//     }));
//     return foundResource;
// }
    let foundResource = await (Resource.find({'attributes.attribute_id': _id.toString()},{'attributes.attribute_value':1,'_id':0},function(err, result) {
        if(err) console.log(err);
        
    }));
    return foundResource;
}

async function checkAttributesInRequestObj(dynamicAttribute) {
    //console.log("aatr name : " + dynamicAttribute);
  //check in reqObj
  var obj = hashTable.get('request_object');
  // hashTable.get('request_object',(obj)=> {
        let requestAttributeArray = [];
                for(var i=0;i<obj.resource.length;i++) {
                     for(var j=0;j<obj.resource[i].resource_return_attributes.length;j++) {
                        requestAttributeArray.push(obj.resource[i].resource_return_attributes[j]);
                     }
                }
                 var options = {
                    keys:['attribute_name'],
                    id: 'attribute_value'
                 };
                 var fuseSearch = new Fuse(requestAttributeArray,options);
                 var attributeSearchResult = fuseSearch.search(dynamicAttribute);
                 //console.log("Search Result  :" + dynamicAttribute  + " : "+ attributeSearchResult);
                 return(attributeSearchResult)
   // });
//return attributeSearchResult;
}

module.exports.getPolicyConstraintAttributes = async (policy) => {
    var policyArray = [];
    var regexp = new RegExp('#([^\\s]*)', 'g');
    var policylist = policy.match(regexp);
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
                    policyArray.push(hashSub[x]);
                }
            }
        }
    }
    //Fetching values for each attribute in policyArray and checking their types
    var attributeArray = [];
    for (let attribute of policyArray) {
            var attributeDetails = {};
            attributeDetails = await FindAttribute(attribute);
            if(attributeDetails == null || attributeDetails == undefined){
                console.log('not found in mongoDB');
                //console.log("req valv : ",await checkAttributesInRequestObj(attribute));

                let DynamicAttribute = {};
                
                if(await checkAttributesInRequestObj(attribute)!=null) {
                    dynamicAttributeRequestValue = await checkAttributesInRequestObj(attribute);
                    //console.log('abc : '+ dynamicAttributeRequestValue);
                    if(dynamicAttributeRequestValue==null||dynamicAttributeRequestValue==''||dynamicAttributeRequestValue==[]||dynamicAttributeRequestValue==undefined) {
                        console.log('not found in request object.Trying to found in PIP');
                        dynamicAttributeRequestValue = await retrieveAttributesFromPIP(attribute);
                        DynamicAttribute["Name"] = attribute;
                        DynamicAttribute["Value"]= dynamicAttributeRequestValue;
                        attributeArray.push(DynamicAttribute);
                    }
                    else {
                        console.log('found in Request Object');
                        DynamicAttribute["Name"] = attribute;
                        DynamicAttribute["Value"]= dynamicAttributeRequestValue;
                        attributeArray.push(DynamicAttribute);
                   }
                   
                }
               
                else  {
                    console.log("Attribute not found anywhere.")
                }

            }else if(attributeDetails != null){
                if(attributeDetails.Type=="Dynamic") {
                let DynamicAttribute = {};
               
                    dynamicAttributeValue = await checkAttributesInRequestObj(attributeDetails.Name);
                    if(dynamicAttributeValue==null||dynamicAttributeValue==''||dynamicAttributeValue==[]||dynamicAttributeValue==undefined) {
                        console.log('Attribute is defined in mongo as Dynamic, trying to find in PIP as not provided in Request Obj.');
                        dynamicAttributeRequestValue = await retrieveAttributesFromPIP(attribute);
                        DynamicAttribute["Name"] = attribute;
                        DynamicAttribute["Value"]= dynamicAttributeRequestValue;
                        attributeArray.push(DynamicAttribute);
                    }
                    else {
                        console.log('Attribute is defined in mongo as Dynamic && value is provided in Request Obj.')
                        //console.log("valv : " + dynamicAttributeValue);
                        DynamicAttribute["Name"] = attributeDetails.Name;
                        DynamicAttribute["Type"] = attributeDetails.Type;
                        DynamicAttribute["Value"]= dynamicAttributeValue;
                        attributeArray.push(DynamicAttribute);
                    }
                    

               
                }
                else{
                    console.log('found in MongoDb');
                    let fixedAttributeValue = {};
                    fixedAttributeValue = await FindResource(attributeDetails._id);
                    let valv = fixedAttributeValue[0].attributes;
                    let FixedAttribute = {};
                    FixedAttribute["Name"] = attributeDetails.Name;
                    FixedAttribute["Type"] = attributeDetails.Type;
                    FixedAttribute["Value"] = valv[0].attribute_value
                    attributeArray.push(FixedAttribute);
                    }
            }
    }
    console.log(attributeArray);
     return EvaluatePolicyConstraint.evaluatePolicy(policy,attributeArray);
    };


retrieveAttributesFromPIP = async (pipAttributesToBeFetched) => {
// Retrieve attributes here & fetch data from PIP database..
var attributeValue;
var body = {
  "name": "getusersecuritycontextfull",
  "elements": [
    {
      "userName": "AMUNSHI",
      "teammateId": "009272",
      "firstName": "Amish",
      "lastName": "Munshi",
      "businessEntity": "Health Care",
      "titleEntitlementProfileName": null,
      "titleAbbreviation": null,
      "jobCode": null,
      "userType":"customer",
      "jobTitle": null,
      "Chin":'Hello',
      "jobDescription": null,
      "jobCodeWorkdayGroup": null,
      "titleLocations": null,
      "licenseLocations": null,
      "championLocations": null,
      "patientLocations": null,
      "supervisorTeammateId": "09876",
      "supervisorFirstName": "Ralph",
      "supervisorLastName": "Mitchell",
      "isClinical": false,
      "zeroAccessIndicator": 1
    }
  ]
}
attributeValue = body.elements[0].userName;
console.log("PIP called - " + pipAttributesToBeFetched+" : "+attributeValue);

return(attributeValue);

    };
  