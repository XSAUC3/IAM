// load identifyingAttribute function
const IdentifyingAttributes = require('./identifyingAttributes');
async function returnAttributes(resourceAttributeArray,resource) {
    var attributeArray = [];
    // for (let attribute of resourceAttributeArray) {
        for(i=0;i<resourceAttributeArray.length;i++) {
            var attributeDetails = {};
            attributeDetails = await IdentifyingAttributes.FindAttribute(resourceAttributeArray[i]);
            if(attributeDetails == (null || undefined || '')){
                console.log('No FIXED attribute found.');
                return false;
            }else if(attributeDetails != null){
                let fixedAttributeValue = {};
                fixedAttributeValue = await IdentifyingAttributes.FindResource(attributeDetails._id,resource);
                let FixedAttribute = {};
                // for(i=0;i<fixedAttributeValue.attributes.length;i++) {
                    console.log(fixedAttributeValue.attributes[i].attribute_value);
                    FixedAttribute[attributeDetails.Name] = fixedAttributeValue.attributes[i].attribute_value;
                    //attributeArray.push(FixedAttribute);
  
                // }
                
               //FixedAttribute[attributeDetails.Name] = fixedAttributeValue.attributes[0].attribute_value;
                // FixedAttribute["Value"] = 
            attributeArray.push(FixedAttribute);
            }
    }
    console.log(attributeArray)
     return attributeArray; 

}
exports.returnAttributes = returnAttributes;
