// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load routes
const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Configuration
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);

// Set Port for Deploy (default is Heroku's port)
const PORT = process.env.PORT || 4000; 

app.listen(port, () => console.log(`Server up and running on port ${PORT} !`));

/* const expenseRoutes = express.Router();
let Expense = require('./models/expense');

var userId = '';

let User = require('./models/user');

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")))
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// For mobile testing
expenseRoutes.post('/all', (req, res, next) => {
  const userId = req.body.userId;
  Expense.find({userId: userId})
  .select("_id description amount month day year")
  .exec()
  .then(docs => {
	res.status(200).json(
		docs.map(doc => {
			return {
				description: doc.description,
				amount: doc.amount,
				month: doc.month,
				day: doc.day,
				year: doc.year
			}
		})
	);
  })
  .catch(err => {
	console.log(err);
	res.status(500).json({
  	  error: err
	})
  });
});
// For mobile testing
expenseRoutes.route('/').get(function(req, res) {
    Expense.find(function(err, expenses) {
        if (err) {
            console.log(err);
        } else {
            res.json(expenses);
        }
    });
});

// Login route
expenseRoutes.post("/loginUser", (req, res, next) => {
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

		userId = user[0]._id;

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

// Add new user
expenseRoutes.post("/createUser", (req, res, next) => {
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

// Route to return ALL expenses in the database for a specific user.
expenseRoutes.get("/getAllExpenses", (req, res, next) => {
  //const userId = "5c78ce86a484a23550339d6a";
  Expense.find({userId: userId}, function(err, expenses) {
	
	if (err) {
		console.log(err);
	} else {
		res.json(expenses);
	}
  });
});

// Route to return all expenses for a specific month
expenseRoutes.get("/month/:newMonth", (req, res, next) => {
  //const userId = "5c78ce86a484a23550339d6a";
  const month = req.params.newMonth;
  console.log(month);
  Expense.find({userId: userId, month: month}, function(err, expenses) {
	console.log(expenses);
	if (err) {
		console.log(err);
	} else {
		res.json(expenses);
	}
  });
});

// Route to return all expenses with a specific group code
expenseRoutes.get("/code/:thisCode", (req, res, next) => {
  const groupCode = req.params.thisCode;
  console.log(groupCode);
  Expense.find({groupCode: groupCode}, function(err, expenses) {
	console.log(expenses);
	if (err) {
		console.log(err);
	} else {
		res.json(expenses);
	}
  });
});

// Route to return specific expense in database.
expenseRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Expense.findById(id, function(err, expense) {
        res.json(expense);
    });
});

// Route to add expense 
expenseRoutes.route('/add').post(function(req, res) {
    let expense = new Expense(req.body);
    expense.save()
        .then(expense => {
            res.status(200).json({'expense': 'expense added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new expense failed');
        });
});

expenseRoutes.route('/update/:id').post(function(req, res) {
    Expense.findById(req.params.id, function(err, expense) {
        if (!expense)
            res.status(404).send("data is not found");
        else
            expense.description = req.body.description;
            expense.amount = req.body.amount;
            expense.month = req.body.month;
            expense.day = req.body.day;
            expense.year = req.body.year;
            expense.groupCode = req.body.groupCode;
            expense.save().then(expense => {
                res.json('Expense updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// Route to delete
expenseRoutes.delete("/delete/:id", (req, res, next) => {
  //const userId = "5c78ce86a484a23550339d6a";
  const id = req.params.id;
  Expense.findOneAndDelete({_id: id}, function(err, expenses) {
	if (err) {
		console.log(err);
	} else {
		res.json({
		success: id});
	}
  });
});

app.use('/expenses', expenseRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); */