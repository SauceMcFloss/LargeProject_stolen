 import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateExpense from "./components/createExpense";
import EditExpense from "./components/editExpense";
import ExpensesList from "./components/expenseList";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Track Dat CA$H</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Expenses</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Expense</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ExpensesList} />
          <Route path="/edit/:id" component={EditExpense} />
          <Route path="/create" component={CreateExpense} />
        </div>
      </Router>
    );
  }
}

export default App;
