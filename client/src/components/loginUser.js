import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

	
	onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
	
	onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
		console.log(`Username: ${this.state.username}`);
		console.log(`Password: ${this.state.password}`);
     
        const checkUser = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('/expenses/loginUser', checkUser)
            .then(res => console.log(res.data));
 
		this.setState = {
            username: '',
            password: ''
        }

		this.props.history.push('/home');
    }

    render() {
		
        return (
            <div style={{marginTop: 10}}>
                <h3><center>Welcome Back!</center></h3>
				<h5>Sign In</h5>
                <form onSubmit={this.onSubmit}>     				
					<div className="form-group">
					  <label>Username: </label>
					  <input  type="text"
						className="form-control"
						value={this.state.username}
						onChange={this.onChangeUsername}
						/>
					</div>
					<div className="form-group"> 
                        <label>Password: </label>
                        <input  type="text"
							className="form-control"
							value={this.state.password}
							onChange={this.onChangePassword}
							/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-success" />
                    </div>
                </form>
				<h5>New User?</h5>
				<button className="btn btn-success">
					<Link to="/register" className="nav-link">
						Register
					</Link>
				</button>
            </div>
        )
    }
}