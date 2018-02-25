const mongoose = require('mongoose');
const App = require('../../models/app_schema');
const Attribute = require('../../models/attribute_schema');
const Resource = require('../../models/resource_schema');


async function FindAttribute(attribute){
    let foundAttribute = await (Attribute.findOne({'Name': attribute},{Name: 1,_id: 1,Type: 1}, function(err, attribute) {
        if(err) console.log(err);
        
    }));
    return foundAttribute;
}

async function FindResource(_id){
    let foundResource = await (Resource.findOne({'attribute_id.attribute_id': _id.toString()},{'attribute_id': 1,'attribute_name': 1,_id:0},function(err, result) {
        if(err) console.log(err);
        
    }));
    return foundResource.attribute_id[0].attribute_value;
}


module.exports.getPolicyConstraintAttributes = async (policy) => {
 // RONAK

    // For Each Policy Extract The Variables From the constrain text And Return Those Variables Back along with their Types.
    // If The Type is FIXED then Pass the Value Too. Values for variables type FIXED are available in resource master.
    // Type of Attribute can be found in Attribute Master

    //Fetching attributes form PolicyConstraints starting with #Hashtag & pushing them in policyArray[]
    var policyConstraintAttributesArray = [];
    var regexp = new RegExp('#([^\\s]*)', 'g');
    var to_match = policy[0].policy_constrains;
    console.log(to_match);
    var policylist = to_match.match(regexp);
    for (var p in policylist) {
        var hashSub = policylist[ p ].split('#');
        for (var x in hashSub) {
            if (hashSub[x] != '')
            {
                if (hashSub[x].substr(hashSub[x].length - 1) == ":")
                {
                    hashSub[x] = hashSub[x].slice(0, -1);
                }
                if (hashSub[x] != '') {
                    policyConstraintAttributesArray.push(hashSub[x]);
                }
            }
        }
    }
    console.log(policyConstraintAttributesArray);
    //Fetching values for each attribute in policyArray and checking their types
    var attributeArray = [];
    for (let attribute of policyConstraintAttributesArray) {
            var attributeDetails = {};
            attributeDetails = await FindAttribute(attribute);
           // console.log(attributeDetails);

            if(attributeDetails == null || attributeDetails == undefined){
                console.log('Problem with Constraint Policy');
            }else if(attributeDetails != null){

                if(attributeDetails.Type=="Dynamic") {
                    //pass only _id , attribute_name & attribute_type in the array
                //    console.log(attributeDetails.Name + " - Dynamic");
                let DynamicAttribute = {};
                    DynamicAttribute["Name"] = attributeDetails.Name;
                    DynamicAttribute["Type"] = attributeDetails.Type;
                
                    console.log("Changed - " + JSON.stringify(DynamicAttribute));
                
                    attributeArray.push(DynamicAttribute);
                    //return attributeArray;
                }
                else{
                    //pass attribute_id & attribute value..
                    console.log(attributeDetails.Name + " - Fixed");
                    //attributeArray.push(attribute);
                    let fixedAttributeValue = {};
                    fixedAttributeValue = await FindResource(attributeDetails._id);
                 //   console.log("FIXED ATTRIBUTE: " + fixedAttributeValue);
                    //console.log(err);
                    let FixedAttribute = {};
                    FixedAttribute["Name"] = attributeDetails.Name;
                    FixedAttribute["Type"] = attributeDetails.Type;
                    FixedAttribute["value"] = fixedAttributeValue;
                  
                    console.log("Changed - " + JSON.stringify(FixedAttribute));

                    attributeArray.push(FixedAttribute);
                    //console.log(result.attribute_id);
                    //return result.attribute_id;
                  
                 
                    }

            }

            // push the attribute to the array which has to be return 
           // console.log("Dynamic Attribute Array - "+attributeArray); 

         
    }
    console.log(attributeArray);
   // return policyConstraintAttributesArray;
     return attributeArray;

    };
    
module.exports.retrieveAttributesFromPIP = async (pipAttributesToBeFetched) => {
// RONAK
// Webservice To Be Created And Call to it
// Retrieve attributes here & fetch data from PIP database..
var body = {
  "name": "getusersecuritycontextfull",
  "elements": [
    {
      "adusername": "AMUNSHI",
      "teammateId": "009272",
      "firstName": "Amish",
      "lastName": "Munshi",
      "businessEntity": "Health Care",
      "titleEntitlementProfileName": null,
      "titleAbbreviation": null,
      "jobCode": null,
      "jobTitle": null,
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

  return body; //returning body to the web_service

    };
    
//#endregion
    

//console.log(module.exports.getPolicyConstraintAttributes("if(#Painting = true) { return  true} #a"));