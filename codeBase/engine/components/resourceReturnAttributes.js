const IdentifyingAttributes = require('./identifyingAttributes');
async function returnAttributes(resourceAttributeArray,resource) {
    console.log("hello : "+resourceAttributeArray);
    var attributeArray = [];
    var attrArr = [];
        if(resourceAttributeArray == ''|| resourceAttributeArray == undefined || resourceAttributeArray == null ) {
            return [];
        }
        else {
            for(i=0;i<resourceAttributeArray.length;i++) {
                console.log("curr attr : "+ resourceAttributeArray[i]);
                var attributeDetails = {};
                attributeDetails = await IdentifyingAttributes.FindAttribute(resourceAttributeArray[i]);
                if(attributeDetails == (null || undefined || '')){
                    console.log('No FIXED attribute found.');
                    return false;
                }else if(attributeDetails != null){
                    let fixedAttributeValue = {};
                    fixedAttributeValue = await IdentifyingAttributes.FindResource(attributeDetails._id,resource);
                    let FixedAttribute = {};
                    var filteredAttributeValue = fixedAttributeValue.attributes;
                        console.log("attr valv : "+filteredAttributeValue[0].attribute_value);
                        if(filteredAttributeValue[0].attribute_value == (null || undefined || '')) {
                            FixedAttribute[attributeDetails.Name] = "null"; 
                            attributeArray.push(FixedAttribute);
                            attrArr.push(attributeDetails.Name+": null");
                        }
                        else {
                            FixedAttribute[attributeDetails.Name] = filteredAttributeValue[0].attribute_value;
                            attributeArray.push(FixedAttribute);
                            attrArr.push(attributeDetails.Name,filteredAttributeValue[0].attribute_value);
                        }
                     

                    }
            }
            console.log(attributeArray)
            // console.log("AtrrArr"+attrArr);
            return attributeArray; 
        }
}
exports.returnAttributes = returnAttributes;
