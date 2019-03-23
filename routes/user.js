const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

router.post("/register", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User already exists."
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  _id: result._id,
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// Login route
router.post("/login", (req, res, next) => {
  User.find({username: req.body.username}).exec().then(user => {
    if (user.length < 1) {
      return res.status(401).json({
      message: "Auth failed: no username entered"
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
        message: "Auth failed: password doesn't match"
        });
      }
      if (result) {
        const token = jwt.sign(
        {
          username: user[0].username,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        });

        return res.status(200).json({
          message: "Auth successful: User is logged in",
          username: user[0].username,
          userId: user[0]._id,
            //loggedIntoken: token
        });
      }
      res.status(401).json({
        message: "Auth failed"
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:userId", (req, res, next) => {
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
});

module.exports = router;