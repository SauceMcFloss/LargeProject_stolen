import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './index.css';
import App from './App';
import Login from "./components/loginUser";
import CreateUser from "./components/createUser";
import * as serviceWorker from './serviceWorker';

render((
	<Router>
		<Switch>
			<Route path="/" exact component={Login} />
			<Route path="/register" exact component={CreateUser} />
			<Route path="/home" exact component={App} />
		</Switch>
	</Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
