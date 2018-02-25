const express = require('express');
var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
const router = express.Router();
var store_password;

//blacklisted characters [RegularExpression] that cannot go in the database
const blacklistedExp = '^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$';

// bring in the model
const App = require('../models/app_schema');
const ResourceType = require('../models/resourceType_schema');
const Attribute = require('../models/attribute_schema');
const Role = require('../models/role_schema');
const Resource = require('../models/resource_schema');
const Policy = require('../models/policy_schema');
const PolicyTargetAction = require('../models/PolicyTargetActions_schema');
const User = require('../models/user_schema');


//------------------------------------------------Application------------------------------------------------------------------------

//Application API

// fetch All Apps
router.get('/Applications', (req, res, next) => {
  App.find({}, function(err, apps) {
    if (err) res.json(err) ;
    res.json(apps);  
  });
});

//fetch single app by id:
router.get('/application/:id', (req,res,next) =>{
  App.findById( {_id:req.params.id}, (err, app) => {  
    if (err) {res.json(err);} 
    res.json(app);
  });
});

//Add App
router.post('/addApp', (req, res, next) => {
  // let newApp = new App({
  //   app_name        : validator.blacklist(req.body.app_name,        blacklistedExp ) ,
  //   app_displayname : validator.blacklist(req.body.app_displayname, blacklistedExp ) ,
  //   app_description : validator.blacklist(req.body.app_description, blacklistedExp )
  // });
  let newApp = new App({
    app_name        : req.body.app_name, 
    app_displayname : req.body.app_displayname, 
    app_description : req.body.app_description,
  });
  newApp.save( (err,createdObj ) => {
    if(err)  res.status(500);  
    else     res.status(200).send(createdObj); 
  })
});

//edit App
router.put('/updateApp/:id' , (req,res,next) => {
  var id = req.params.id;
    let editedApp = new App({
      app_name        : validator.blacklist(req.body.app_name,        blacklistedExp ) ,
      app_displayname : validator.blacklist(req.body.app_displayname, blacklistedExp ) ,
      app_description : validator.blacklist(req.body.app_description, blacklistedExp )
    });
    App.update({_id : id  },{$set:req.body },(err , result) => {
      if(err) res.status(500).send(err); 
      else    res.status(200).send(result);
    });
})

//Delete App
router.delete('/delApp/:id' , (req,res,next) => {
  App.findByIdAndRemove({_id: req.params.id}, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});


//------------------------------------------------ResorceType------------------------------------------------------------------------
//ResorceType API

router.get('/resourceTypes', (req, res, next) => {
  ResourceType.find({}, function(err, resourceTypes) {
    if (err) res.json(err) ;
    res.json(resourceTypes);  
  });
});

//fetch single rt by id:
router.get('/resourceType/:id', (req,res,next) =>{
  ResourceType.findById( {_id:req.params.id}, (err, resourceType) => {  
    if (err) {res.json(err);} 
    else{ res.json(resourceType); }
  });
});

//Add rt
router.post('/addResourceType', (req, res, next) => {
   let actions = [];
console.log(req.body.resourceType_actions);
  //  for( i=1; i<= req.body.resourceType_actions.length ; i++ ){
  //    actions.push({
  //      action_name: req.body.resourceType_actions[i].action_name
  //    });
  //   }
    console.log(req.body.resourceType_actions)
  let newResourceType = new ResourceType({
    resourceType_name        : req.body.resourceType_name, 
    resourceType_displayname : req.body.resourceType_displayname, 
    resourceType_description : req.body.resourceType_description,
    resourceType_actions     : req.body.resourceType_actions
  });
  newResourceType.save( (err,createdObj ) => {
    if(err)  res.status(500);  
    else     res.status(200).send(createdObj); 
  })
});

//edit rt
router.put('/updateResourceType/:id' , (req,res,next) => {
  var id = req.params.id;
    let editedResourceType = new ResourceType({
      resourceType_name        : validator.blacklist(req.body.resourceType_name,        blacklistedExp ) ,
      resourceType_displayname : validator.blacklist(req.body.resourceType_displayname, blacklistedExp ) ,
      resourceType_description : validator.blacklist(req.body.resourceType_description, blacklistedExp )
    });
    ResourceType.update({_id : id  },{$set:req.body },(err , result) => {
      if(err) res.status(500).send(err); 
      else    res.status(200).send(result);
    });
})

//Delete rt
router.delete('/delResourceType/:id' , (req,res,next) => {
  ResourceType.findByIdAndRemove({_id: req.params.id}, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});

//------------------------------------------------Attributes------------------------------------------------------------------------

 //#region  Add, Edit, Delete & Fetch Attributes

  // Add Attribute
  router.post('/attributes/addAttribute', (req, res, next) => {
    
    let newAttribute = new Attribute({
      Name            :req.body.Name,
      Type            :req.body.Type,
      DataType        :req.body.DataType,
      Description     :req.body.Description,
      Application_Id  :req.body.Application_Id,
      Single_Multiple :req.body.Single_Multiple
    });
    Attribute.addAttribute(newAttribute ,(err, attribute) =>{
      if(err) { res.status(500).json({Error: err.message}); }
      else if(attribute == null) { res.status(500).json({success: false, msg: 'Something Went Wrong'}); }
      else    { res.status(200).json({success: true, Attribute: attribute}); }
    });
  });

  //edit Attribute
  router.put('/attributes/updateAttribute' , (req,res,next) => {
    Attribute.findByIdAndUpdate({_id: req.body._id }, {$set:req.body}, {new: true}, (err , attribute) => {
      if(err) {res.status(500).json({Error: err["errmsg"]}); console.log(err); }
      else if(attribute == null) { res.status(404).json({success: false, msg: 'Attribute Not Found'}); } 
      else    {res.status(200).json({success: true, Attribute: attribute});}
    });
  });

  //Delete Attribute
  router.delete('/attributes/deleteAttribute' , (req,res,next) => {
    Attribute.findByIdAndRemove({_id: req.query._id}, (err, attribute) => {
    if(err) { res.status(500).json({Error: err["errmsg"]}); console.log(err);}
    else if(attribute == null) { res.status(404).json({success: false, msg: 'Attribute Not Found'}); }
    else    { res.status(200).json({success: true, Deleted_Attribute: attribute}); }
  });
  });

  // fetch Attributes
  router.get('/attributes/allAttributes', (req, res, next) => {
    Attribute.find({}, function(err, attributes) {
      if (err) { res.status(500).json({Error: err["errmsg"]}); }
      else { res.status(200).json({success: true, Attributes: attributes}); } 
    });
  });

  //fetch Attribute by ID
  router.get('/attributes/attributeById', (req,res,next) =>{
    Attribute.findById({_id: req.query._id}, (err, attribute) => {  
      if (err) {res.status(500).json({Error: err["errmsg"]});}
      else if(attribute == null) { res.status(404).json({success: false, msg: 'Attribute Not Found'}); } 
      else { res.status(200).json({success: true, Attribute: attribute}); }
    });
  });

  //#endregion

  //#region Filter Attribute By Name And/Or By Type And/Or By DataType

    // Filter Attributes
    router.get('/attributes/filterAttributes', (req, res, next) => {

      if((req.query.Name !== undefined && req.query.Name !== null) && 
         (req.query.Type === undefined || req.query.Type === null) &&
         (req.query.DataType === undefined || req.query.DataType === null)){

          Attribute.find({'Name': {'$regex': req.query.Name, '$options': 'i'}}, (err, attributes) => {
            if(err){
              res.status(500).json({Error: err});
            }else if(attributes == null){
              res.status(200).json({success: false, msg: 'No Attributes With Matching Name Filter'});
            }else {
              res.status(200).json({success: true, Attributes: attributes});
            }
          });

      }else if((req.query.Type !== undefined && req.query.Type !== null) && 
               (req.query.Name === undefined || req.query.Name === null) &&
               (req.query.DataType === undefined || req.query.DataType === null)) {

                Attribute.find({'Type': {'$regex': req.query.Type, '$options': 'i'}}, (err, attributes) => {
                  if(err){
                    res.status(500).json({Error: err});
                  }else if(attributes == null){
                    res.status(200).json({success: false, msg: 'No Attributes With Matching Type Filter'});
                  }else {
                    res.status(200).json({success: true, Attributes: attributes});
                  }
                });

      }else if((req.query.DataType !== undefined && req.query.DataType !== null) && 
               (req.query.Name === undefined || req.query.Name === null) &&
               (req.query.Type === undefined || req.query.Type === null)) {

                Attribute.find({'DataType': {'$regex': req.query.DataType, '$options': 'i'}}, (err, attributes) => {
                  if(err){
                    res.status(500).json({Error: err});
                  }else if(attributes == null){
                    res.status(200).json({success: false, msg: 'No Attributes With Matching DataType Filter'});
                  }else {
                    res.status(200).json({success: true, Attributes: attributes});
                  }
                });
      
      }else if((req.query.Name !== undefined && req.query.Name !== null) &&
               (req.query.Type !== undefined && req.query.Type !== null) &&
               (req.query.DataType === undefined || req.query.DataType === null)) {

                Attribute.find({'Name': {'$regex': req.query.Name, '$options': 'i'},
                                'Type': {'$regex': req.query.Type, '$options': 'i'}}, (err, attributes) => {
                  if(err){
                    res.status(500).json({Error: err});
                  }else if(attributes == null){
                    res.status(200).json({success: false, msg: 'No Attributes With Matching Name Filter'});
                  }else {
                    res.status(200).json({success: true, Attributes: attributes});
                  }
                });

      }else if((req.query.Type !== undefined && req.query.Type !== null) &&
               (req.query.DataType !== undefined && req.query.DataType !== null) &&
               (req.query.Name === undefined || req.query.Name === null)) {

                Attribute.find({'Type': {'$regex': req.query.Type, '$options': 'i'},
                                'DataType': {'$regex': req.query.DataType, '$options': 'i'}}, (err, attributes) => {
                  if(err){
                    res.status(500).json({Error: err});
                  }else if(attributes == null){
                    res.status(200).json({success: false, msg: 'No Attributes With Matching Type Filter'});
                  }else {
                    res.status(200).json({success: true, Attributes: attributes});
                  }
                });

      }else if((req.query.DataType !== undefined && req.query.DataType !== null) &&
               (req.query.Name !== undefined && req.query.Name !== null) &&
               (req.query.Type === undefined || req.query.Type === null)) {
            
                Attribute.find({'DataType': {'$regex': req.query.DataType, '$options': 'i'},
                                'Name': {'$regex': req.query.Name, '$options': 'i'}}, (err, attributes) => {
                  if(err){
                    res.status(500).json({Error: err});
                  }else if(attributes == null){
                    res.status(200).json({success: false, msg: 'No Attributes With Matching DataType Filter'});
                  }else {
                    res.status(200).json({success: true, Attributes: attributes});
                  }
                });

      }else if((req.query.Name !== undefined && req.query.Name !== null) &&
               (req.query.Type !== undefined && req.query.Type !== null) &&
               (req.query.DataType !== undefined || req.query.DataType !== null)) {
   
                Attribute.find({'Name': {'$regex': req.query.Name, '$options': 'i'},
                                'Type': {'$regex': req.query.Type, '$options': 'i'},
                                'DataType': {'$regex': req.query.DataType, '$options': 'i'}} , (err, attributes) => {
                  if(err){
                    res.status(500).json({Error: err});
                  }else if(attributes == null){
                    res.status(200).json({success: false, msg: 'No Attributes With Matching Name Filter'});
                  }else {
                    res.status(200).json({success: true, Attributes: attributes});
                  }
                });          
      }

    });

  //#endregion
//#endregion


//------------------------------------------------Roles------------------------------------------------------------------------

//fetch All Role
router.get('/role/Roles', (req, res, next) => {
  Role.find({}, function(err, apps) {
  if (err) res.json(err) ;
  res.json(apps);  
});
});

//fetch single role by id:
router.get('/role/:id', (req,res,next) =>{
  Role.findById( {_id:req.params.id}, (err, app) => {  
  if (err) {res.json(err);} 
  res.json(app);
});
});

//Add Role
router.post('/role/addRole', (req, res, next) => {

let newRole = new Role({
  Role_name : req.body.Role_name, 
  Application_id : req.body.Application_id, 
});
console.log(req.body);
newRole.save( (err,createdObj ) => {
  if(err)  res.status(500).json({Error:"Not working"});  
  else     res.status(200).send(createdObj); 
})
});

//edit Role
router.put('/role/updateRole/:id' , (req,res,next) => {
var id = req.params.id;
  let editedRole = new Role({
    Role_name : validator.blacklist(req.body.Role_name,blacklistedExp ) ,
    Application_id : validator.blacklist(req.body.Application_id, blacklistedExp ) ,
  });
  Role.update({_id : id  },{$set:req.body },(err , result) => {
    if(err) res.status(500).send(err); 
    else    res.status(200).send(result);
  });
})

//Delete Role
router.delete('/role/delRole/:id' , (req,res,next) => {
  Role.findByIdAndRemove({_id: req.params.id}, 
  function(err, docs){
 if(err) { res.sendStatus(403); }
 else    { res.sendStatus(200); }
});
});


// ---------------------------------------Resources-------------------------------------------------------------------

//fetch All Resource
router.get('/Fetch/Resource', (req, res, next) => {
  Resource.find({}, function(err, apps){
    if (err) res.json(err) ;
    res.json(apps);  
  });
});

//Add App
router.post('/addResource', (req, res, next) => {
  let newApp = new Resource({
  res_name        : req.body.res_name, 
  res_displayname : req.body.res_displayname, 
  res_descrpition : req.body.res_descrpition,
  Resource_typeid : req.body.Resource_typeid,
  attribute_id : req.body.attribute_id,
  attribute_value : req.body.attribute_value, 
  application_id : req.body.application_id
});
console.log(newApp);

newApp.save( (err,createdObj ) => {
  if(err)  res.status(500).json({Error : 'Not Working.'});  
  else     res.status(200).json(createdObj); 
})
});

//fetch single app by id:
router.get('/Resource/:id', (req,res,next) =>{
  Resource.findById({_id: req.params.id}, (err, app) => {  
  if (err) {res.json(err);} 
  else {res.json(app);}
});
});

//edit App
router.put('/UpdateResource/:id' , (req,res,next) => {
  var id = req.params.id;
    let editedApp = new Resource({
        res_name        : req.body.res_name, 
        res_displayname : req.body.res_displayname, 
        res_descrpition : req.body.res_descrpition,
        Resource_typeid : req.body.Resource_typeid,
        attribute_id : req.body.attribute_id,
        attribute_value : req.body.attribute_value, 
        application_id : req.body.application_id
    });
    Resource.update({_id : id  },{$set:req.body },(err , result) => {
      if(err) res.status(500).send(err); 
      else    res.status(200).send(result);
    });
})

//Delete App
router.delete('/DeleteResource/:id' , (req,res,next) => {
  Resource.findByIdAndRemove({_id: req.params.id}, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});

//------------------------------------------Policies--------------------------------------------------------


//fetch All policies
router.get('/policies', (req, res, next) => {
  Policy.find({}, function(err, apps) {
    if (err) res.json(err);
    res.json(apps);  
  });
});

//fetch single Policy by id:
router.get('/policy/:id', (req,res,next) =>{
  Policy.findById( { _id : req.params.id}, (err, app) => {  
    if (err) {res.json(err);} 
    res.json(app);
  });
});

//Add Policy
router.post('/addPolicy', (req, res, next) => {
  let newPolicy = new Policy({
    policy_name       : req.body.policy_name,
    policy_type       : req.body.policy_type,
    policy_constrains : req.body.policy_constrains,
    policy_principals : req.body.policy_principals,
    policy_targets    : req.body.policy_targets
  });
  newPolicy.save( (err,createdObj ) => {
    if(err)  res.status(500);  
    else     res.status(200).send(createdObj); 
  })
});

//edit App
router.put('/updatePolicy' , (req,res,next) => {
    Policy.findByIdAndUpdate({ _id : req.body._id  },{$set:req.body},{new: true },(err , result) => {
      if(err) res.status(500).send(err); 
      else    res.status(200).send(result);
    });
})

//Delete App
router.delete('/delPolicy/:id' , (req,res,next) => {
  Policy.findByIdAndRemove( req.params.id, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});

//find policy target action by ID
router.get('/:id', (req,res,next) =>{
  PolicyTargetAction.findById({_id: req.params.id}, (err, app) => {  
    if (err) {res.json(err);} 
    res.json(app);
  });
});

//Add Policy Target Actions
router.post('/addPolicyTargetActions',(req,res,next)=>{
  let pta = new PolicyTargetAction({
    policy_Id             :   req.body.policy_Id,
    resourceType_Id       :   req.body.resourceType_Id,
    resourceType_name     :   req.body.resourceType_name,
    resourceType_actions  :   req.body.resourceType_actions
  })
  pta.save( (err,createdObj ) => {
    if(err)  res.status(500);  
    else     res.status(200).send(createdObj); 
  })
});

router.put('/updatePolicyTargetActions' , (req,res,next) => {
  PolicyTargetAction.findByIdAndUpdate({ _id : req.body._id  },{$set:req.body},{new: true },(err , result) => {
    if(err) res.status(500).send(err); 
    else    res.status(200).send(result);
  });
})

//end region policy

//----------------------------------------------Admin Users-------------------------------------------------------------

//Add user
router.post('/user/Add', (req, res, next) => {
  
	bcrypt.hash(req.body.password, null, null,function(err, hash) {
    if (err) return next(err); 
    store_password = hash; 
   
});
 
console.log(store_password);
let NewUser = new User({
name : req.body.username,
    username : req.body.username, 
    password : store_password,
email : req.body.email,
role : req.body.role,
});
NewUser.save( (err,createdObj ) => {
  if(err)  res.status(500);  
  else     res.status(200).send(createdObj); 
})
});

//fetch All users
router.get('/users/all', (req, res, next) => {
  User.find({}, function(err, users) {
    if (err) res.json(err) ;
    res.json(users);  
  });
});

//fetch single user by id:
router.get('/user/:id', (req,res,next) =>{
  User.findById( {_id:req.params.id}, (err, user) => {  
    if (err) {res.json(err);} 
    res.json(user);
  });
});


// router.get('/application/:id', (req,res,next) =>{
//   App.findById( {_id:req.params.id}, (err, app) => {  
//     if (err) {res.json(err);} 
//     res.json(app);
//   });
// });



//edit user
router.put('/UpdateUser/:id' , (req,res,next) => {
  var id = req.params.id;
  
    User.update({_id : id  },{$set:req.body },(err , result) => {
      if(err) res.status(500).send(err); 
      else    res.status(200).send(result);
    });
});

//Delete user
router.delete('/DelUser/:id' , (req,res,next) => {
  User.findByIdAndRemove({_id: req.params.id}, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});


module.exports = router;



