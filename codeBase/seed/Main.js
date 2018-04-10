const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');

//models
const App = require('./models/app_schema');
const Attribute = require('./models/attribute_schema');
const ResourceType = require('./models/resourceType_schema');
const Resource = require('./models/resource_schema');
const Role = require('./models/role_schema');
const User = require('./models/user_schema');
const Policy = require('./models/policy_schema');

// Mongoose Connection

// Connect To Database
mongoose.connect(config.database+config.args);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connecting to database ...');
}).then(() => { // if all is ok we will be here
  console.log('Authenticated to the database '+config.database);
})
.catch(err => { // we will not be here...
  console.error('MongoDb Connection Error', err);
});

// Removing Data from DB.

  App.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('Application Data is being Deleted Successfully..!');    
  });

  Attribute.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('Attribute Data is being Deleted Successfully..!');    
  });

  ResourceType.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('ResourceType Data is being Deleted Successfully..!');    
  });

  Resource.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('Resource Data is being Deleted Successfully..!');    
  });

  Role.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('Role Data is being Deleted Successfully..!');    
  });

  User.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('User Data is being Deleted Successfully..!');    
  });

  Policy.remove({},(err, success) => {
    if(err)  console.log(err);
    else    console.log('Policy Data is being Deleted Successfully..!');    
  });


// Adding Data to DB.

  let AppObj = new App({
    app_name : "University",
    app_displayname : "University",
    app_description : "University description"
  });

  AppObj.save().then((AppData) => {
    // console.log('Application ID : ' + AppData._id);

    let AttrObjs = [
      {
        Name : "Classes",
        Type : "Fixed",
        DataType : "String",
        Description : "Classes that are allocated to a Course.",
        Application_Id : AppData._id,
        Single_Multiple : "Multiple"
      },
      {
        Name : "Students",
        Type : "Dynamic",
        DataType : "String",
        Description : "Students who have enrolled to a Course.",
        Application_Id : AppData._id,
        Single_Multiple : "Multiple"
      }
    ];

    let ResourceTypeObjs = [
      {
        resourceType_name : "Courses",
        resourceType_displayname : "Courses",
        resourceType_description : "courses Description",
        resourceType_actions :  [
                                    {
                                        action_name : "read"
                                    },
                                    {
                                      action_name : "write"
                                    }
                                ],
        application_id : AppData._id
      },
      {
        resourceType_name : "Practicals",
        resourceType_displayname : "Practicals",
        resourceType_description : "Practicals Description",
        resourceType_actions :  [
                                    {
                                        action_name : "Use Lab"
                                    }
                                ],
        application_id : AppData._id
      }
    ];

    return new Promise(async (resolve, reject) => {
      let AttrArrayId = [];
      let ResTypeArrayId = [];
      await Attribute.insertMany(AttrObjs).then((AttrData) => {
          for (let i = 0; i < AttrData.length; i++) {
            if (AttrData[i].Type == 'Fixed') {
              AttrArrayId.push(AttrData[i]._id);
            }
          }
      });
      await ResourceType.insertMany(ResourceTypeObjs).then((ResTypeData) => {
          for (let i = 0; i < ResTypeData.length; i++) {
            let arrayAction = [];
            for (let j = 0; j < ResTypeData[i].resourceType_actions.length; j++) {
              if(j/2 == 0){
                arrayAction.push({action_name : ResTypeData[i].resourceType_actions[j].action_name, action_state : true});
              } else {
                arrayAction.push({action_name : ResTypeData[i].resourceType_actions[j].action_name, action_state : false});                
              }
              // console.log(arrayAction);
              if (j == (ResTypeData[i].resourceType_actions.length - 1)){
                ResTypeArrayId.push({ResType_Id : ResTypeData[i]._id, Res_Action : arrayAction});
              }
            }
            if(i == (ResTypeData.length -1)){
              resolve({ResTypes : ResTypeArrayId, Attrs_id : AttrArrayId});
            }
            // ResTypeArrayId.push(ResTypeData[i]._id);
          }
      });

    }).then((resolveData) => {
      // console.log(resolveData.ResTypes[0].Res_Action);
      // console.log('Attribute ID : ' + resolveData.Attrs_id);

      let ResourceArrayId = [];
      let RoleArrayId = [];

      let ResourceObjs = [
        {
          res_name : "B.Sc. IT",
          res_displayname : "B.Sc. IT",
          res_descrpition : "School of IT",
          Resource_typeid : resolveData.ResTypes[0].ResType_Id,
          attributes :  [
                              {
                                  attribute_id:resolveData.Attrs_id[0],
                                  attribute_value:"4"
                              }
                          ],
          application_id : AppData._id
        },
        {
          res_name : "M.Sc. IT",
          res_displayname : "M.Sc. IT",
          res_descrpition : "School of IT",
          Resource_typeid : resolveData.ResTypes[1].ResType_Id,
          attributes :  [
                              {
                                  attribute_id:resolveData.Attrs_id[0],
                                  attribute_value:"5"
                              }
                          ],
          application_id : AppData._id
        }
      ];

      let RoleObjs = [
        {
          Role_name      : "Students",
          Application_id : AppData._id  
        },
        {
          Role_name      : "Faculty",
          Application_id : AppData._id  
        }
      ];

      return new Promise(async(resolve, reject) => {
        await Resource.insertMany(ResourceObjs).then((ResourceData) => {
          for (let i = 0; i < ResourceData.length; i++) {
            // console.log(ResourceData[i]);
            ResourceArrayId.push({res_id : ResourceData[i]._id, res_name : ResourceData[i].res_name});
          }
        });

        await Role.insertMany(RoleObjs).then((RoleData) => {
          for (let i = 0; i < RoleData.length; i++) {
            // console.log(RoleData[i]);
            RoleArrayId.push({role_id : RoleData[i]._id, role_name : RoleData[i].Role_name});
            if (i == (RoleData.length - 1)){
              // console.log({Roles_Id : RoleArrayId, Resources_Id : ResourceArrayId});
              resolve({Roles : RoleArrayId, Resources_Id : ResourceArrayId});
            }
          }
        });

      }).then(async(resolve2Data) => {
        // console.log(resolve2Data.Roles, resolve2Data.Resources_Id);

        let User_ID = '';
        let User_name = '';

        let UserObj = new User({
          role    :   resolve2Data.Roles,
          status  :   true,
          name    :   "Dhruvesh",
          username:   "dhruv2103",
          password:   "$2a$04$zPxFnAig5TZjz9f/mdOzmOH4LLgioAgAfhe4Hd/Qff1HlsAxJm3Ou",
          email   :   "dhkalathiya@gmail.com"
        });

        await UserObj.save().then((UserData) => {
          // console.log(UserData);
          User_ID = UserData._id;
          User_name = UserData.name;
        });

        // console.log(User_ID);

        let PolicyObj = [
          {
            policy_name : "Attendance",
            application_id : AppData._id,
            policy_type : "grant",
            policy_constrains : "80% attendance",
            policy_principals : [
                                    {
                                        id   :User_ID,
                                        type :"user",
                                        name :User_name
                                    }
                                ],
            policy_targets : [
                                {
                                    resource_id             :   resolve2Data.Resources_Id[0].res_id,
                                    resource_name           :   resolve2Data.Resources_Id[0].res_name,
                                    resourceType_Id         :   resolveData.ResTypes[0].ResType_Id,
                                    resourceType_actions    :   resolveData.ResTypes[0].Res_Action
                                }
                             ]
          },
          {
            policy_name : "Leave Criteria",
            application_id : AppData._id,
            policy_type : "grant",
            policy_constrains : "20% Leave",
            policy_principals : [
                                    {
                                        id   :resolve2Data.Roles[0].role_id,
                                        type :"role",
                                        name :resolve2Data.Roles[0].role_name
                                    },
                                    {
                                      id   :resolve2Data.Roles[1].role_id,
                                      type :"role",
                                      name :resolve2Data.Roles[1].role_name
                                    }
                                ],
            policy_targets : [
                                {
                                    resource_id             :   resolve2Data.Resources_Id[1].res_id,
                                    resource_name           :   resolve2Data.Resources_Id[1].res_name,
                                    resourceType_Id         :   resolveData.ResTypes[1].ResType_Id,
                                    resourceType_actions    :   resolveData.ResTypes[1].Res_Action
                                }
                             ]
          }
        ];
        
        await Policy.insertMany(PolicyObj).then((PolicyData) => {
          console.log('All Data is being added to DB successfully..!');
        });

      });
      
    });
    
  });