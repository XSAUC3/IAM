const mongoose = require('mongoose');

//Policy Schema
const PolicySchema = mongoose.Schema(
    {
        "policy_name"           :   { type: String,  required: true },
        "policy_type"           :   { type: String,  required: true },
        "policy_constrains"     :   { type: String,  required: true },
        "policy_principals"     :   [ 
                                        { 
                                                "role_id"  : { type : String },
                                                "role_name": { type : String }    
                                        }  
                                    ],
        "policy_targets"        :   [
                                        {
                                                "resource_id"  : { type:String },
                                                "resource_name": { type:String }
                                        }
                                    ]   
    }
);

const resources = module.exports = mongoose.model('policies',PolicySchema);
