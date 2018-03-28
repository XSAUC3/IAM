var hashTable = require("node-hashtable");

saveReqObj = function(reqObj){
    return new Promise(function (resolve, reject) {
        if(reqObj.username != ( null || undefined )){
            hashTable.set('request_object',reqObj,()=>resolve('sucesses !'))
        }
        else reject('faliure !')
    });
} 

exports.setdata = saveReqObj;