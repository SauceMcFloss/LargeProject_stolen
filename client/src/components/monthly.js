import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import logo from "../krabs.gif";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import jwt_decode from "jwt-decode";

var temp = [];
var sum = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.month}</td>
        <td>{props.item.day}</td>
        <td>{props.item.year}</td>
        <td>
            <Link to={"/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

class TodosList extends Component {

    constructor(props) {
        super(props);
		
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeSort = this.onChangeSort.bind(this);
		
        this.state = {
			expensesArray: [],
			total: 0
		};
    }
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	componentDidMount() {		
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
        axios.post('/expenses/month/Jan', {
			id: idOfUser
		})
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeMonth(month) {
		const idOfUser = jwt_decode(localStorage.getItem("jwtToken")).id;
		console.log(month);
        axios.post('expenses/month/'+month, {
			id: idOfUser
		})
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sortItem) {
		temp = this.state.expensesArray;
		temp = sortBy(temp, sortItem);
		sum = sumBy(temp, 'amount');
		this.setState({ 
					expensesArray: temp,
					total: sum
				});
    }

    listOfExpenses() {
        return this.state.expensesArray.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }

    render() {
        return (
            <div>
              <h3><center><img src={logo} width="150" height="75" alt=""/>	Monthly Lists	<img src={logo} width="150" height="75" alt="" /></center></h3>
			  
			  <nav className="navbar navbar-expand-sm navbar-light bg-light">
					<img src={logo} width="100" height="100" alt=""/>
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav mr-auto">
						<li className="navbar-item">
						  <Link to="/dashboard" className="nav-link">All Expenses</Link>
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
					  </ul>
					</div>
					<img src={logo} width="100" height="100" alt=""/>
				</nav>
				<button
					style={{
					width: "150px",
					borderRadius: "3px",
					letterSpacing: "1.5px",
					marginTop: "1rem"
					}}
					onClick={this.onLogoutClick}
					className="btn btn-large waves-effect waves-light hoverable blue accent-3"
					>
					Logout
				</button>
				
			  <h5>Total: ${this.state.total} </h5>
				<div className="container">
				  <nav className="navbar navbar-expand-sm navbar-light bg-light">
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav mr-auto">
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Jan')}}>Jan</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Feb')}}>Feb</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Mar')}}>Mar</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Apr')}}>Apr</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('May')}}>May</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Jun')}}>Jun</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Jul')}}>Jul</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Aug')}}>Aug</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Sep')}}>Sep</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Oct')}}>Oct</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Nov')}}>Nov</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeMonth('Dec')}}>Dec</button>
					  </ul>
					</div>
				  </nav>
				</div>
                <table className="table table-striped table-bordered" 
				  style={{ marginTop: 30 }} >
				  
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="description" 
								onClick={() => {this.onChangeSort('description')}
								}>Description</th>
                            <th data-field="amount" 
								onClick={() => {this.onChangeSort('amount')}
								}>Amount</th>
                            <th data-field="month" 
								onClick={() => {this.onChangeSort('month')}
								}>Month</th>
                            <th data-field="day" 
								onClick={() => {this.onChangeSort('day')}
								}>Day</th>
                            <th data-field="year" 
								onClick={() => {this.onChangeSort('year')}
								}>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listOfExpenses() }
                    </tbody>
                </table>
            </div>
        )
    }
}

TodosList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TodosList);