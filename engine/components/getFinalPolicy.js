const IdentifyingAttributes = require('./identifyingAttributes');
const Resource = require('../models/resource_schema');
const Policy = require('../models/policy_schema');

evaluatePolicy = function(resources) {
    for(let i=0; i<resources.length; i++) {
        //for each resource fetch policy

    }
    console.log(resources);
   //get policy array for each
   //return obj.resource;
}

exports.evaluatePolicy = evaluatePolicy;

