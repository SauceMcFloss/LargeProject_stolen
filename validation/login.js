// Dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	
	// Email checks
	if (Validator.isEmpty(data.email)) {
		email = "Email field is required";
	}
	else if (!Validator.isEmail(data.email)) {
		email = "Email is invalid";
	}
	
	// Password checks
	if (Validator.isEmpty(data.password)) {
		password = "Password field is required";
	}
	
	// Return
	return {
		errors,
		isValid: isEmpty(errors)
	};
};