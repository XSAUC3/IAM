var express = require('express');
var router = express.Router();
var ldap = require('ldapjs');
var assert = require('assert') ;
var arr = require('./ldap');
var router = express.Router();

var opts = {
    filter: '(objectclass=*)',
    scope: 'sub',
    attributes: ['cn', 'sn', 'mail', 'mobile'] // Attribute to fetch from LDAP
  };

var client = ldap.createClient({
    url: 'ldap://localhost:10389/ou=ITdept,o=kavalus' // URL to LDAP Server
});

router.post('/', (req, res, next) => {
    
    if(req.body == null)
    {
        console.log('data is not there');
    }else{
        console.log('data is there');
        console.log(req.body);
    }

    var user = req.body.username;
    var pass = req.body.password;

    console.log(user);
    console.log(pass);

    client.bind("cn="+ user +",ou=ITdept,o=kavalus",pass, function(err) {
        if(err){
            console.log('Did not get any data.');
            res.json({Login: 'false', Error: 'Invalid UserName & Password.'});
        }
        else{
            console.log('got data.');

            //Search Data(Attributes)
            client.search('cn='+ user +',ou=ITdept,o=kavalus', opts, function(err, abc) {
                assert.ifError(err);
              
                abc.on('searchEntry', function(entry) {
                    var data = JSON.stringify(entry.object);
                    parsedData = JSON.parse(data);
                    var a = {
                        first_name : parsedData['cn'],
                        last_name : parsedData['sn'],
                        mail : parsedData['mail'],
                        mobile : parsedData['mobile'],
                        controls : parsedData['controls']
                    }
                    res.json({status : {Login: 'true', Error: 'None'}, attributes : a}); // It will send the JSON to User.
                });
            });
        }
        });
});



module.exports = router;