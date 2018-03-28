//Activity1
authenticate = function(username,password){
    //Authenticate user from MongoDB if not found check in ldap
    // checkInLdap(username,password)
    console.log(username);
     return true;
} 

checkInLdap = function(username) {
    //Check in Ldap , If exists add to mongo else userFound:false
    return
}

exports.authenticate = authenticate;