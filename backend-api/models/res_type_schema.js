const mongoose = require('mongoose');
const route = require('../routes/api');

const ResourceTypeSchema = mongoose.Schema({
    restype_id: {
        type: String,
        required: true,
        unique: true
    },
    restype_name: {
        type: String,
        required: true,
        unique: true
    },
    restype_displayname: {
        type: String,
        required: true
    },
    restype_description: {
        type: String,
        required: true
    },
    restype_actions: [
        {
            restype_action_id:{
                type: String,
                required: true
            },
            restype_action_name: {
                    type: String,
                    required: true
                }
        }
    ],
    restype_attributes: [
        {
            restype_attribute_id:{
                type: String,
                required: true
            },
            restype_attribute_name: {
                    type: String,
                    required: true
                }
        }
    ]
});

const res_type = module.exports = mongoose.model('res_type', ResourceTypeSchema);