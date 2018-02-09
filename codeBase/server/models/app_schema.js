const mongoose = require('mongoose'); 

const AppSchema = mongoose.Schema({
        "app_name"          :   { type: String,  required: true },
        "app_displayname"   :   { type: String,  required: true },
        "app_description"   :   { type: String,  required: true },
});

const App = module.exports = mongoose.model('applications', AppSchema);