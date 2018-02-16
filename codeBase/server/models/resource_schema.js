const mongoose = require('mongoose');
const config = require('../config/database');
//Resource Schema
const ResourceSchema = mongoose.Schema({
    res_name: 
    {
        type:String,
        required:true
    },
    res_displayname:   
    { 
        type: String,  
        required: true 
    },
    res_descrpition:
    {
        type:String,
        required:true
    },
    Resource_typeid:{
        type:String,
        required:true
     },
     attribute_id:{
        type:String,
       // required:true
     },
     attribute_value:{
        type:String,
        required:true
     },
    application_id:{
       type:String,
       required:true
    }
});

const resource = module.exports = mongoose.model('resource', ResourceSchema);