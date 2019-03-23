const mongoose = require('mongoose');

// Add first name, last name, email

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: { type: String, required: true},
	lastName: { type: String, required: false},
	email: { type: String, required: false},
	username: { type: String, required: true},
	password: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);