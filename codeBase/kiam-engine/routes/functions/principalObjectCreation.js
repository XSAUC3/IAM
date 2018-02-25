
// DHANVARSHA

const mongoose = require('mongoose');
const User = require('../../models/user_schema');
const Roles = require('../../models/role_schema')

//#region FUNCTIONS FOR CREATING PRINCIPAL OBJECT & FETCHING USER PROFILE ATTRIBUTES

async function FindRoles(username){
    let roles = (User.find({'username' : username}, 'role' , (err,data) =>{
        
    }));
    if(roles.length == 0){
        console.log('ROLES: ' + roles);
    }else if(roles.length > 0){
        console.log('ROLES: ' + roles);
    }

    return roles;
}

module.exports.fetchRolesForUser = async (username) => {
    // RETURN AN ARRAY OF ROLES
    let roles = [];
    let fetchedRoles = [];
    roles = await FindRoles(username);
console.log(roles);

if(roles.length == 0){
    
    console.log('NO ROLE AVAILABLE: ' + roles.role);

}else if(roles.length > 0) {
    for(i=0; i<roles.length; i++){
        console.log('ROLE: ' + roles[i].role);
        fetchedRoles.push(roles[i].role);
    }
}
console.log('FETCHED ROLLS: ' + fetchedRoles);
    return fetchedRoles;

};
//console.log(module.exports.fetchRolesForUser('VP'));
//#endregion
