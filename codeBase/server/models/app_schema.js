const mongoose = require('mongoose'); 

const AppSchema = mongoose.Schema({
        "app_name"          :   { type: String,  required: true,unique:true },
        "app_displayname"   :   { type: String },
        "app_description"   :   { type: String },
});

// const ResourceTypeSchema = mongoose.Schema({
//         "rt_name"           :   { type: String, required: true },
//         "rt_displayname"    :   { type: String },
//         "rt_description"    :   { type: String},
//         "rt_action"         :   {
//                                         "id"      :  { type : number },
//                                         "action"  :  { type : String }
//                                 }
// });

const App = module.exports = mongoose.model('applications', AppSchema);

// RT Schema ResourceType
// const ResourceType = module.exports = mongoose.model('resourceTypes', ResourceTypeSchema); 