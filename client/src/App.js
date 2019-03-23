import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateUser from "./components/createUser";
import LoginUser from "./components/loginUser";

import ExpensesList from "./components/expenseList";
import CreateExpense from "./components/createExpense";
import EditExpense from "./components/editExpense";
import Monthly from "./components/monthly";
import Group from "./components/groupPage";

import logo from "./giphy.gif";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

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
                  <Link to="/home" className="nav-link">All Expenses</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Expense</Link>
                </li>
				<li className="navbar-item">
                  <Link to="/monthly" className="nav-link">Monthly</Link>
                </li>
				<li className="navbar-item">
                  <Link to="/group" className="nav-link">Group</Link>
                </li>
				/* <li className="navbar-item">
                  <Link to="/" className="nav-link">Logout</Link>
                </li> */
              </ul>
            </div>
			<img src={logo} width="100" height="100" alt=""/>
          </nav>
          <br/>
		  <Route path="/" exact component={LoginUser} />
		  <Route path="/register" exact component={CreateUser} />
		  <Route path="/home" exact component={ExpensesList} />
          <Route path="/create" component={CreateExpense} />
		  <Route path="/edit/:id" component={EditExpense} />
		  <Route path="/monthly" component={Monthly} />
		  <Route path="/group" component={Group} />
        </div>
      </Router>
    );
  }
}

export default App;