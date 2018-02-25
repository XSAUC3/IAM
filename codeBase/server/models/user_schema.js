const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	"name"   :   { type: String,  required: true },
    "username"   :   { type: String,  required: true },
    "password"   :   { type: String,  required: true },
	"email"   :   { type: String,  required: true },
	"role"   :   { type: String,  required: true },
	"status"   :   { type: Boolean,  default: true }
});

const User = module.exports = mongoose.model('users', UserSchema);

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
  }
  
  module.exports.getUserByUsername = function(username, callback) {
	const query = {username: username}
	User.findOne(query, callback);
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback) {
	  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	  });
	}
	