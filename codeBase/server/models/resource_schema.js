const mongoose = require('mongoose');
const config = require('../config/database');
//Resource Schema
const ResourceSchema = mongoose.Schema({
    res_name: 
    {
        type:String
    },
    res_displayname:   
    { 
        type: String
    },
    res_descrpition:
    {
        type:String
    },
    Resource_typeid:{
        type:String
     },
     attribute_id:{
        type:Array
    },
    application_id:{
       type:String,
       required:true
    }
});

const resource = module.exports = mongoose.model('resource', ResourceSchema);