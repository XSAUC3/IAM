const express = require('express');
const router = express.Router();
const ldap = require('ldapjs');
const ldap_config = require('./../models/LDAPSchema'); 


router.get('/', (req, res, next) => {

    ldap_config.find({}, (err, obj) => {
        if(err) res.json({success : false, msg : 'Invalid Data..!'});
        else {
            ldapfunction(res,obj);
        }
    });
});

function ldapfunction(res,object){
        
    const client = ldap.createClient({
        url:object[0].Url
    })

    // Filter for Fetching Data of User which is now fetch *.
    const opts = {
        filter: object[0].UserBase_Filter,
        scope:  object[0].UserSearch_Scope
    };

    client.bind(object[0].Admin_UID_BaseDN, object[0].Admin_Password_Attr, function(err) {
        if(err) res.json({success : false, msg : 'Invalid Credentials..!'});
        else {
            let arr = [];
            client.search(object[0].UserBase_DN, opts, function(error, abc) {
                if(err) throw err;

                console.log('abc is ' + JSON.stringify(abc) + '\n');
                
                //Search all data 
                abc.on('searchEntry', function(entry){
                    arr.push(JSON.stringify(entry.object));
                });

                abc.on('end', function(result) {
                    res.json({success : true, msg : 'Connect Successfully..!', obj : arr});
                });


            });
        }
        
    });
}

module.exports = router;



// var promise1 = new Promise(function(resolve, reject) {
//     let arr = [];
//     client.search(object[0].UserBase_DN, opts, function(error, res) {
//         assert.ifError(error);
    
//         //Search all data 
//         res.on('searchEntry', function(entry) {
//         console.log('entry: ' + JSON.stringify(entry.object));
//         arr.push(JSON.stringify(entry.object));
//         });
//     });
//     resolve(arr);
// });
//   promise1.then(function(value) {
//     console.log(value);
//   });