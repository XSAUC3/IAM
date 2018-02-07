const mongoose = require('mongoose');
const config = require('../config/database');

//Resource Schema
const ResourceSchema = mongoose.Schema({
    restype_id: {
        type: String,
        required: true
    },
    res_name: {
        type: String,
        required: true 
    },
    res_displayname: {
        type: String,
        required: true
    },
    res_description: {
        type: String,
        required: true
    },

});

const resources = module.exports = mongoose.model('resources',ResourceSchema);

module.exports.addResource = function(newResource,callback){
    newResource.save(callback);
}