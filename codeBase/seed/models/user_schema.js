const mongoose = require('mongoose');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
	"name"   :   { type: String},
  "username"   :   { type: String},
  "password"   :   { type: String },
	"email"   :   { type: String, },
	"role"   :   [
		{
			"role_id" : {type:String},
			"role_name": {type:String}
		}
	],
	"status"   :   { type: Boolean,  default: true }
});


const User = module.exports = mongoose.model('users', UserSchema);