import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

export default class RegisterUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRepeat = this.onChangeRepeat.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
			repeat: ''
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
	
	onChangeRepeat(e) {
        this.setState({
            repeat: e.target.value
        });
    }	

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`First name: ${this.state.firstName}`);
        console.log(`Last name: ${this.state.lastName}`);
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

		//if(this.state.password == this.state.repeat){
			axios.post('/expenses/adduser', newUser)
				.then(res => console.log(res.data));
				
			this.setState = {
				firstName: '',
				lastName: '',
				email: '',
				username: '',
				password: '',
				repeat: ''
			}
		//}
		/* else{
			console.log('Passwords don\'t match');
			
			this.setState = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				username: this.state.username,
				password: '',
				repeat: ''
			}
		} */
		
		this.props.history.push('/');
    }

    render() {		
        return (
            <div style={{marginTop: 10}}>
                <h3>Register New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>First name: </label>
                        <input  type="text"
							className="form-control"
							value={this.state.firstName}
							onChange={this.onChangeFirstName}
							/>
                    </div>
                    <div className="form-group">
                        <label>Last name: </label>
                        <input 
							type="text" 
							className="form-control"
							value={this.state.lastName}
							onChange={this.onChangeLastName}
							/>
                    </div>
					<div className="form-group">
					  <label>Email: </label>
					  <input 
							type="text" 
							className="form-control"
							value={this.state.email}
							onChange={this.onChangeEmail}
							/>
					</div>					
					<div className="form-group">
					  <label>Username: </label>
					  <input 
							type="text" 
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
                        <label>Repeat password: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.repeat}
                                onChange={this.onChangeRepeat}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register User" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}