const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	"name"   :   { type: String,  required: true },
  "username"   :   { type: String,  required: true },
  "password"   :   { type: String,  required: true },
	"email"   :   { type: String,  required: true },
	"role"   :   { type: Array,  required: true },
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

	module.exports.addUser = function(newUser, callback) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if(err) throw err;
				newUser.password = hash;
				newUser.save(callback);
			});
		});
	}

	module.exports.changePassword = function(data, callback) {
	  bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(data.password, salt, (err, hash) => {
				if(err) throw err;
				data.password = hash;
				User.findByIdAndUpdate(data.id, { $set: { password: data.password}}, function (err, data) {
					if (err) return handleError(err);
					callback(null, data);
				});
			});
		});
	}

	module.exports.UpdateUser = function(id, UpdateUser, callback) {
	  bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(UpdateUser.password, salt, (err, hash) => {
				if(err) throw err;
				UpdateUser.password = hash;
				User.findByIdAndUpdate(id, UpdateUser, function (err, data) {
					if (err) return handleError(err);
					callback(null, data);
				});
			});
		});
	}
	