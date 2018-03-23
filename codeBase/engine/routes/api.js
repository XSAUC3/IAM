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

//load activities
const AuthenticateUser = require('../activities/authenticateUser');
router.post('/', (req, res)=> {
    let requestObject = req.body;
    console.log(AuthenticateUser.checkInLdap());
    res.send(AuthenticateUser.authenticate(req.body));
    
});
module.exports = router;