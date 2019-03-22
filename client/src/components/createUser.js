import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
	
	onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
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
        
        console.log(`Form submitted:`);
        console.log(`First Name: ${this.state.firstName}`);
        console.log(`Last Name: ${this.state.lastName}`);
		console.log(`Email: ${this.state.email}`);
		console.log(`Username: ${this.state.username}`);
		console.log(`Password: ${this.state.password}`);
     
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        axios.post('/expenses/createUser', newUser)
            .then(res => console.log(res.data));
 
		this.setState = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        }

		this.props.history.push('/home');
    }

    render() {
		
        return (
            <div style={{marginTop: 10}}>
                <h3><center>Register for Track Dat Ca$h!</center></h3>
				<h5>Sign Up</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>First Name: </label>
                        <input  type="text"
							className="form-control"
							value={this.state.firstName}
							onChange={this.onChangeFirstName}
							/>
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input 
							type="text" 
							className="form-control"
							value={this.state.lastName}
							onChange={this.onChangeLastName}
							/>
                    </div>
					<div className="form-group">
					  <label>Email: </label>
					  <input  type="text"
						className="form-control"
						value={this.state.email}
						onChange={this.onChangeEmail}
						/>
					</div>					
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
                        <input type="submit" value="Create User" className="btn btn-success" />
                    </div>
                </form>
				<h5>Existing User?</h5>
				<button className="btn btn-success">
					<Link to="/" className="nav-link">
						Login
					</Link>
				</button>
            </div>
        )
    }
}