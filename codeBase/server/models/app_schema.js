const mongoose = require('mongoose'); 

const AppSchema = mongoose.Schema({
        "app_name"          :   { type: String,  required: true,unique:true },
        "app_displayname"   :   { type: String },
        "app_description"   :   { type: String },
});

AppSchema.index({_id: 1, app_name: 1});

const App = module.exports = mongoose.model('applications', AppSchema);