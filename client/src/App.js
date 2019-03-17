import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ExpensesList from "./components/expenseList";
import CreateExpense from "./components/createExpense";
import EditExpense from "./components/editExpense";
import Monthly from "./components/monthly";

import logo from "./giphy.gif";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
		<center><h1><font size = "10"><b>Track Dat CA$H</b></font></h1></center><br/>
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <img src={logo} width="100" height="100" alt=""/>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">All Expenses</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Expense</Link>
                </li>
				<li className="navbar-item">
                  <Link to="/monthly" className="nav-link">Monthly</Link>
                </li>
              </ul>
            </div>
			<img src={logo} width="100" height="100" alt=""/>
          </nav>
          <br/>
		  <Route path="/" exact component={ExpensesList} />
          <Route path="/create" component={CreateExpense} />
		  <Route path="/edit/:id" component={EditExpense} />
		  <Route path="/monthly" component={Monthly} />
        </div>
      </Router>
    );
  }
}

export default App;