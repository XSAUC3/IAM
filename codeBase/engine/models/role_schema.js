const mongoose = require('mongoose'); 

const RoleSchema = mongoose.Schema({

    "Role_name"        :   { type: String,  required: true},
    "application_id"   :   { type: String}
});

const Role = module.exports = mongoose.model('Roles',RoleSchema);