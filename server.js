const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRoutes = express.Router();
const userRoutes = express.Router();
const PORT = process.env.PORT || 4000; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing
const path = require("path");
const dotenv = require("dotenv").config();
let Expense = require('./models/expense');
let User = require('./models/user');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))
mongoose.connect('mongodb://Admin:Hello2@cluster0-shard-00-00-7dwwj.mongodb.net:27017,cluster0-shard-00-01-7dwwj.mongodb.net:27017,cluster0-shard-00-02-7dwwj.mongodb.net:27017/testLarge?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Route to return ALL expenses in the database for a ALL users.
expenseRoutes.route('/').get(function(req, res) {
    Expense.find(function(err, expenses) {
        if (err) {
            console.log(err);
        } else {
            res.json(expenses);
        }
    });
});

// Route to return ALL expenses in the database for a specific user.
expenseRoutes.get("/getAllExpenses", (req, res, next) => {
  const userId = "5c78ce86a484a23550339d6a";
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
	console.log("In month route");
  const userId = "5c78ce86a484a23550339d6a";
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

// Route to return specific expense in database.
expenseRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Expense.findById(id, function(err, expense) {
        res.json(expense);
    });
});

// Route to add expense 
userRoutes.route('/add').post(function(req, res) {
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
  const userId = "5c78ce86a484a23550339d6a";
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

// Route to add user 
/* userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user registered successfully'});
        })
        .catch(err => {
            res.status(400).send('registering new user failed');
        });
}); */

app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});