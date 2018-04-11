var Fuse = require('fuse.js');

function test(policyConstraint, attributeArray) {
    var reg = new RegExp('#([^\\s]*)', 'g');
    console.log("constraint : " + policyConstraint);
    const splitArray = policyConstraint.split(' ');
    var i = 0;
    splitArray.forEach(function(element) {
        if(element.match(reg)) {
          var attributeValue;
          console.log("value to replace : "+element+" => "+attributeArray[i])
          if (isNaN(attributeArray[i])) {
              attributeValue = "'" + attributeArray[i] + "'";
              console.log("Attribute value is a string");
          }
          else if (!isNaN(attributeArray[i])) {
              attributeValue = attributeArray[i];
              console.log("Attribute value is number");
          }
          else {
              console.log("Attribute value not defined");
              attributeValue = "null";
          } 
          splitArray[splitArray.indexOf(element)] = attributeValue;
          policyConstraint.replace(splitArray[0],attributeArray[i]);
          i++;
        }
        
    });
    var joinArray = splitArray.join(' ');
    if(eval(joinArray)) {
       console.log("constraint is true");
        return true;
    }
    else {
       console.log("constraint is false");
          return false;
    }
}

test("#equal == 'str' && #ronak == 23 && #dssdds == 12", ['str',23,12]);
//"#equal == 100 && #ronak == 23  ", [{"Name":"equal","Value":100},{"Name":"ronak", "Value": 23}]
// [100,23]