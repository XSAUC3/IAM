const ldap = require('ldapjs');
var assert = require('assert') ;
const mongoose = require('mongoose');
const config = require('../../../server/config/database');
const User = require('../../models/user_schema');

const searchBase = 'o=kavalus';
/*const client = ldap.createClient({
    url: 'ldap://localhost:10389/ou=User,o=kavalus'
});*/

// Declaring Globel Variable User & Roles
let UserData = {};
let Roles = [];
// Filter for Fetching Data of User which is now fetch *.
const opts = {
    filter: '(objectclass=*)',
    scope: 'sub'
  };

// DHRUVESH

//#region FUNCTIONS FOR CHECKING USER AUTHENTICATION IN KIAM & LDAP
   /*return User.find({"username": username}, (err, user) => {
        let returnVarible = false;
        // console.log(user);
        if(err){
            console.log(err);
           // let returnVariable = false;
           // callback(false);
           returnVarible = false;
            
        }
        else if (user.length == 0)
        {
          //  console.log("NULL: " + user);
          //  let returnVariable = false;
          //  callback(false);
          returnVarible = false;
        
        }
        else if (user.length > 0){
            console.log("USER: " + user);
           // console.log(returnVariable);
           // let returnVariable = true;
           // callback(true);
           returnVarible = true;
         
        }       
});

, (resolve) => {
    serTimeot(resolve, 3000);
}

*/
async function FindUser(username){

let returnVariable = await (User.find({"username": username}, (err, user) => {
    // console.log(user);
    if(err){
        console.log(err);  
    }
    else if (user.length == 0)
    {
      console.log("NULL: " + user);
    }
    else if (user.length > 0){
        console.log("USER: " + user);
    }       
}));

//console.log(returnVariable);
return returnVariable;
}

async function authenticateUser(username, password){
    let returnVariable = await (User.find({username: username, password: password}, (err, user) => {
        if(err){
            console.log(err);
        }else if(user.length == 0){
            console.log("Username Or Password Wrong");
        }else if(user.length > 0){
            console.log("User: " + user);
        }
    }));

    return returnVariable;
}


module.exports.userExistsInKIAM = async (username) => {
     // RETURN TRUE OR FALSE
     
    // console.log(username);

    try{
       var returnVariable = await FindUser(username);
   }catch (ex){
       console.log(ex);
   }

    console.log(returnVariable);
    if(returnVariable.length == 0)
     {
         return false;
     }else if(returnVariable.length > 0) {
         return true;
     }else if( returnVariable == undefined){
         console.log(returnVariable);
     }
     //console.log(returnVariable);
     //return returnVariable;
};

module.exports.Authenticate = async (username, password) => {
     // RETURN TRUE OR FALSE
     try{
        var returnVariable = await FindUser(username);
    }catch (ex){
        console.log(ex);
    }
 
     console.log(returnVariable);
     if(returnVariable.length == 0)
      {
          return false;
      }else if(returnVariable.length > 0) {
          return true;
      }else if( returnVariable == undefined){
          console.log(returnVariable);
      }
};

module.exports.fetchUserDetailsFromUserStore = async (username, password) => {
     // RETURN AN ARRAY OF OBJECTS USER DETAILS

/*
     // RETURN AN ARRAY OF OBJECTS USER DETAILS


    // Generating DN by adding User Name Into it.
    let dn = "cn="+ username +",ou=User,o=kavalus";

    // Generating Filter for fetching Roles from LDAP.
    // It will fetch the roles where UniqueMember is equal to DN.
    const opts_for_Role = {
        filter: '(&(objectclass=groupOfUniqueNames)(uniqueMember='+ dn +'))',
        scope: 'sub'
      };      

    // Autenticating User by Passing DN and PASSWORD.
    client.bind(dn, password, function(err) {
        if(err) {

            // It should return False but As Return is not working Here I'm Printing it.
            console.log({status : {Login: false, Error: 'Invalid UserName & Password.'}});
            // return False;

        } else {
            
            // Else It will Fetch the data from LDAP.

            // Search User
            // This Function will fetch the User Data and put it into our USER OBJECT which we have Declared Above.
            client.search(dn, opts, function(err, res) {
                assert.ifError(err);
                
                //Fetch User Data
                res.on('searchEntry', function(entry) {
                    let data = JSON.stringify(entry.object);
                    parsedData = JSON.parse(data);

                    // Putting Users Data into 'USER OBJECT'
                    UserData = {
                        first_name : parsedData['displayName'],
                        last_name : parsedData['sn'],
                        mobile_no : parsedData['mobile'],
                        email : parsedData['mail'],
                        designation : parsedData['description'],
                        username: parsedData['cn'],
                        password: password,
                    }

                    // Printing USER
                    // console.log(UserData);

                });
            });
            
            // Search Role of that USER using Filter
            // This Function will fetch the User Roles and push it into our ROLE ARRAY which we have Declared Above.
            client.search("ou=Roles,o=kavalus", opts_for_Role, function(err, res) {
                assert.ifError(err);
        
                //Fetch User Data
                res.on('searchEntry', function(entry) {
                    let data = JSON.stringify(entry.object);
                    let parsedData = JSON.parse(data);

                    // Pushing Role IDs into Roles(Globel Variable)
                    Roles.push(parsedData['description']);

                    // Printing Roles
                    // console.log(Roles);
                });
            });
            
            // Printing Variables
            // console.log(this.UserData);
            // console.log(this.Roles); 

            // Now the It will Add that Roles into Our User Object and ADD it into Mongo.
            
            // Here I am Giving Manual Data But here there will be Dynamic Data which will come from LDAP
            // Due to It is Asyncronous, It is not Initalizing the value from database.
            UserData = { first_name: 'Amish',
                last_name: 'Munshi',
                mobile_no: '7858696325',
                email: 'am@kavalus.com',
                designation: 'Owner',
                username: 'am6454',
                password: 'am123' };
                
            // Initalizing the value of Roles Manually.
            Roles = [ '5a914c1fe55c3130786c33f9', '5a914bb7e55c3130786c33f8' ];
            UserData.role = Roles;

            // Creating Object of USER Model
            let NewUser = new User(UserData);

            // Saving Into MONGO DATABASE
            NewUser.save((err,createdObj ) => {
                if(err)  console.log(err);
                else     console.log(createdObj);
            });
        }
    });


*/
     let exists = false;
     return [{"exists": exists,"Attributes": [] , "Roles": []}];
};

module.exports.fetchUserDetailsFromKIAM = async (username) => {
    // RETURN AN ARRAY OF OBJECTS USER DETAILS
    return [];
};

//#endregion
