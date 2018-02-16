const mongoose = require('mongoose');

//Policy Target Actions Schema
const PolicyTargetActions = mongoose.Schema(
    {
        "policy_Id"             :   { type: String,  required: true },
        "resourceType_Id"       :   { type: String,  required: true },
        "resourceType_name"     :   { type: String,  required: true },
        "resourceType_actions"  :[ 
                                    { 
                                        "action_name"   : { type : String  },
                                        "action_state"  : { type : Boolean }    
                                    }  
                                ]
    }
);

const resources = module.exports = mongoose.model('PolicyTargetActions',PolicyTargetActions);
