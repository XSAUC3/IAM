var hashTable = require("node-hashtable");
const express = require('express');
const router = express.Router();

//load models
// const App = require('../models/app_schema');
// const ResourceType = require('../models/resourceType_schema');
// const Attribute = require('../models/attribute_schema');
// const Role = require('../models/role_schema');
// const Resource = require('../models/resource_schema');
// const Policy = require('../models/policy_schema');
// const User = require('../models/user_schema');

//load component-activities
const AuthenticateUser = require('../components/authenticateUser');
const ParseObject = require('../components/parseObject');

router.post('/', (req, res)=> {
    ParseObject.setdata(req.body)
    .then((result) => {
        hashTable.get('request_object',(obj)=>{
            AuthenticateUser.authenticate(obj.username,obj.password);``
        })
    })
    .catch((rejection)=>{
        res.send(rejection);
    })
});

module.exports = router;