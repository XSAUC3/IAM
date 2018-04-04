var hashTable = require('node-hashtable')

generateObject = function(obj) {
    return new Promise((resolve,reject) => {
        let finalresourcearray = [];
        return new Promise((pass,fail)=>{
            for(j=0;j<obj.resource.length;j++){
                let finalresource = {
                    resource_id : obj.resource[i].resource_id,
                    actions : obj.resource[i].action,
                    privilage : hashTable.get('privilage')[i]
                }
                finalresourcearray.push(finalresource);
                pass('sucess!');                
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