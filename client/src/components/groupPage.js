import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import logo from "../group.jpg";

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

export default class TodosList extends Component {

    constructor(props) {
        super(props);
		
		this.onChangeSort = this.onChangeSort.bind(this);
		this.onChangeGroupCode = this.onChangeGroupCode.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
        this.state = {
			expensesArray: [],
			total: 0,
			groupCode: ' '
		};
    }
	
	componentDidMount() {		
        axios.get('/expenses/code/8675309')
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
	
	onChangeGroupCode(e) {
		this.setState({
            groupCode: e.target.value
        });
        
    }
	
	onSubmit(e) {
        e.preventDefault();
		
		axios.get('expenses/code/'+this.state.groupCode)
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
	

    listOfExpenses() {
        return this.state.expensesArray.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }

    render() {
        return (
            <div>
              <h3><center><img src={logo} width="200" height="100" alt=""/>	Group Expenses <img src={logo} width="200" height="100" alt="" /></center></h3>
			  
			  <form onSubmit={this.onSubmit}>
				<label>GroupCode:
					<input  type="text"
						className="form-control"
						value={this.state.cat}
						onChange={this.onChangeGroupCode}
						/>
				</label>
				<input type="submit" value="Update" className="btn btn-info" />
			  </form>
			  
			  <h5>Total: ${this.state.total} </h5>
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