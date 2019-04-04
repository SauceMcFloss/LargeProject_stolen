import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import jwt_decode from "jwt-decode";

const optionsMonth = [
  { value: 'Jan', label: 'Jan' },
  { value: 'Feb', label: 'Feb' },
  { value: 'Mar', label: 'Mar' },
  { value: 'Apr', label: 'Apr' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'Jun' },
  { value: 'Jul', label: 'Jul' },
  { value: 'Aug', label: 'Aug' },
  { value: 'Sep', label: 'Sep' },
  { value: 'Oct', label: 'Oct' },
  { value: 'Nov', label: 'Nov' },
  { value: 'Dec', label: 'Dec' }
];

const optionsDay = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
  { value: 31, label: 31 }
];


export default class CreateExpense extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeDay = this.onChangeDay.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeGroupCode = this.onChangeGroupCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            amount: '',
            selectedMonth: '',
            selectedDay: '',
            year: '',
			groupCode: ''
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }
	
	onChangeMonth(selectedMonth) {
        this.setState({
            month: selectedMonth.value
        });
    }
	
	onChangeDay(selectedDay) {
        this.setState({
            day: selectedDay.value
        });
    }
	
	onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }
	
	onChangeGroupCode(e) {
        this.setState({
            groupCode: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Description: ${this.state.description}`);
        console.log(`Amount: ${this.state.amount}`);
		console.log(`Month: ${this.state.month}`);
		console.log(`Day: ${this.state.day}`);
		console.log(`Year: ${this.state.year}`);
		console.log(`Code: ${this.state.groupCode}`);
		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
     
        const newExpense = {
			userId: idOfUser,
            description: this.state.description,
            amount: this.state.amount,
            month: this.state.month,
            day: this.state.day,
            year: this.state.year,
            groupCode: this.state.groupCode
        };

        axios.post('/expenses/add', newExpense)
            .then(res => console.log(res.data));
 
		this.setState = {
            description: '',
            amount: '',
            month: '',
            day: '',
            year: '',
            groupCode: ''
        }
		
		this.props.history.push('/dashboard');
    }

    render() {
		const { selectedMonth } = this.state;
		const { selectedDay } = this.state;
		
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Expense</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input 
							type="text" 
							className="form-control"
							value={this.state.amount}
							onChange={this.onChangeAmount}
							/>
                    </div>
					<div className="form-group">
					  <label>Month: </label>
					  <Select
						name="Month"
						placeholder={this.state.month}
						value={selectedMonth}
						options={optionsMonth}
						onChange={this.onChangeMonth}
					  />
					</div>					
					<div className="form-group">
					  <label>Day: </label>
					  <Select
						name="Day"
						placeholder={this.state.day}
						value={selectedDay}
						options={optionsDay}
						onChange={this.onChangeDay}
					  />
					</div>
					<div className="form-group"> 
                        <label>Year: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                />
                    </div>
					<div className="form-group"> 
                        <label>Group Code: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.groupCode}
                                onChange={this.onChangeGroupCode}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Expense" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}