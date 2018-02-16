const mongoose = require('mongoose'); 

const ResourceTypeSchema = mongoose.Schema({
    "resourceType_name"           :   { type: String, required: true, unique:true},
    "resourceType_displayname"    :   { type: String },
    "resourceType_description"    :   { type: String},
    "resourceType_actions"        :   [
                                        {
                                            "action_name" :  { type: String }
                                        }
                                      ]  
});

//RT Schema ResourceType
const ResourceType = module.exports = mongoose.model('resourceTypes', ResourceTypeSchema); 