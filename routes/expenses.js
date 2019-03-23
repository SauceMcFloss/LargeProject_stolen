const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Expense = require('../models/expense');
const User = require('../models/user');

//Route to add an individual expense  
router.post('/addExpense', (req, res, next) => {
  const expense = new Expense({
    userId: req.body.userId,
    _id: new mongoose.Types.ObjectId(), 
	description: req.body.description,
	amount: req.body.amount,
	month: req.body.month,
	day: req.body.day,
	year: req.body.year,
  });

  expense.save().then(result => {
	res.status(201).json({
	  message: "Expense added.",
	  userId: result.userId,
	  expenseId: result._id
	});
  })
  .catch(err => {
    console.log(err);
	res.status(500).json({
	  error: err
	});
  })
});

// Route to get an individual expense
router.post('/getExpense', (req, res, next) => {
  const id = req.body.expenseId;
  const userId = req.body.userId;
  
  Expense.findById({_id: id, userId: userId})
  .select('description amount month day year userId').exec().then(doc => {
	if (doc.userId == userId){
	  res.status(200).json({
	    description: doc.description,
	    amount: doc.amount,
	    month: doc.month,
	    day: doc.day,
	    year: doc.year,
	  });	
	}
	else {
	  res.status(404).json({message: 'No valid contact match found userId/expenseId'});
	}
  })
  .catch(err => {
    console.log(err);	
	res.status(500).json({error: err});
  });
});

// Route to delete a contact
router.post('/deleteExpense', (req, res, next) => {
  const id = req.body.contactId;
  const userId = req.body.userId;

  // After validating that the contact belongs to the user, remove it.
  Expense.remove({_id: id, userId: userId})
  .exec()
  .then(result => {
  	//console.log(result.n);
  	if (result.n == 0){
  	  res.status(404).json({message: 'Error: Expense/User not bound.'});
  	}
    else {
      res.status(200).json({message: 'Expense deleted.'});
    }
  })
  .catch(err =>{
    console.log(err);
	res.status(500).json({
	  error: err
	})
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

// Route to return ALL expenses in the database with specified month.
router.post("/getMonth", (req, res, next) => {
  const month = req.body.month;
  const userId = req.body.userId;
  Expense.find({userId: userId, month: month})
  .select("_id userId description month year")
  .exec()
  .then(docs => {
    const response = {
	  userId: userId,
	  total: docs.length,
	  expenses: docs.map(doc => {
	    return {
		  description: doc.description,
		  amount: doc.amount,
		  month: doc.month,
		  day: doc.day,
		  year: doc.year,
		}
	  })
	};
    res.status(200).json(response);
  })
  .catch(err => {
	console.log(err);
	res.status(500).json({
  	  error: err
	})
  });
});

module.exports = router;