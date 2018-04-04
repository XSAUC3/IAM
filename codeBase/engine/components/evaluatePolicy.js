var Fuse = require('fuse.js');

function evaluatePolicy(policyConstraint, attributeArray) {
    console.log("policy_constraint : ", policyConstraint);
    // console.log("attributeArray : ",attributeArray);
    var policyArray = [];
    var regexp = new RegExp('#([^\\s]*)', 'g');
    var policylist = policyConstraint.match(regexp);
    for (var p in policylist) {
        var hashSub = policylist[p].split('#');
        for (var x in hashSub) {
            if (hashSub[x] != "") {
                if (hashSub[x].substr(hashSub[x].length - 1) == ":") {
                    hashSub[x] = hashSub[x].slice(0, -1);
                }
                if (hashSub[x] != "") {
                    policyArray.push('#' + hashSub[x]);
                }
            }
        }
    }
    var evalValue;
    for (i = 0; i < policyArray.length; i++) {
        var options = {
            keys: ['Name'],
            id: 'Value'
        };
        var fuseSearch = new Fuse(attributeArray, options);
        console.log("curr attr : ", policyArray[i]);
        var attributeSearchResult = fuseSearch.search(policyArray[i]);
        console.log("s: "  ,attributeSearchResult);
        var attributeValue;
        if (isNaN(attributeSearchResult)) {
            attributeValue = "'" + attributeSearchResult + "'";
            console.log("Attribute value is a string");
        }
        else if (!isNaN(attributeSearchResult)) {
            attributeValue = attributeSearchResult;
            console.log("Attribute value is number");
        }
        else {
            console.log("Attribute value not defined");
            //attributeValue = attributeSearchResult;
        }
        console.log(attributeSearchResult);
        var evalPolicyConstraint = policyConstraint.replace(policyArray[i], attributeValue);
        console.log(evalPolicyConstraint);
        try {
            if (eval(evalPolicyConstraint)) {
                console.log("Constraint is true");
                return true;
            }
            else {
                console.log("Constraint is false");
                return false;
            }
        }
        catch (err) {
            console.log("Constraint is invalid");
        }
    }
}

exports.evaluatePolicy = evaluatePolicy;