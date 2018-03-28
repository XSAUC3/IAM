const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	"name"   :   { type: String,  required: true },
  "username"   :   { type: String,  required: true },
  "password"   :   { type: String,  required: true },
	"email"   :   { type: String,  required: true },
	"role"   :   { type: Array,  required: true },
	"status"   :   { type: Boolean,  default: true }
});

const User = module.exports = mongoose.model('users', UserSchema);
