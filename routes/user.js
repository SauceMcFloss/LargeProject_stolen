// Dependencies
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load model
const User = require("../models/user");

// Register route
router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	
	// Check uniqueness
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		}
	
	User.findOne({ username: req.body.username }).then(user => {
		if (user) {
			return res.status(400).json({ username: "Username already exists" });
		} 
	
	// Define payload
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	
	// Hash password before saving in database
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser
				.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
				});
			});
		}
	});
});

// Login route
router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	
	// Set up fields to check
	const username = req.body.username;
	const password = req.body.password;
	
	// Find user by username
	User.findOne({ username }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Username not found" });
		}
		
		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// If user matched, create JWT payload
				const payload = {
				id: user.id,
				name: user.name
				};
			
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			}
			else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});

// Delete route
/* router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}); */

// Export for use in other files
module.exports = router;