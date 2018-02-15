var ldap = require('ldapjs');
var express = require('express');
var client = ldap.createClient({
    url: 'ldap://localhost:10389/ou=ITdept,o=kavalus'
});

function search(username, password)
{
    console.log('In Ldap Module.');
    client.bind("cn="+ username +",ou=ITdept,o=kavalus",password, function(err) {
        if(err){
            console.log('Did not get any data.');
            return {Login: 'false', Error: 'Invalid UserName & Password.'};
        }
        else{
            console.log('got data.');
            return {Login: 'true', Error: 'None'};
        }
        });
    //console.log("Value is "+ this.ans);
}

module.exports.search = search;