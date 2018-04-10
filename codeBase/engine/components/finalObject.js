var hashTable = require('node-hashtable')

generateObject = function(obj,privilege) {
    return new Promise((resolve,reject) => {
        let finalresourcearray = [];
        return new Promise((pass,fail)=>{
            for(i=0;i<obj.resource.length;i++){
                let finalresource = {
                    resource_id : obj.resource[i].resource_id,
                    actions : obj.resource[i].action,
                    //resource_return_attributes:hashTable.get('resAttr')[i],
                    privilage : privilege[i]
                }
                finalresourcearray.push(finalresource);
                if (i+1===obj.resource.length) {
                    pass('sucess!');   
                }
                           
            }
        }).then((ok)=>{
            let finalObject = {
                username: obj.username,
                resource : finalresourcearray,
            }
            resolve(finalObject)
            hashTable.clear();
        })
        

    })
}

exports.generateObject = generateObject;