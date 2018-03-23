
let userInMongo;
let userInLdap;
let userFound;

authenticate = function(username,userpass){
    //Authenticate user from MongoDB if not found check in ldap
    return
} 

checkInLdap = function(username) {
    //Check in Ldap , If exists add to mongo else userFound:false
    return
}

exports.authenticate = authenticate;
exports.checkInLdap = checkInLdap;