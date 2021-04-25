import React, { Component } from 'react';
import './CustomSelect.css';
class CustomSelect extends Component {


	constructor(props) {
		super(props);
		this.state = { sort: '' }
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
		this.props.sortUpdate(value)
	}

	render() {
		return (
			<form className="CustomSelect">
				<label htmlFor="sortmethod">Sort by:</label>
				<select className="select-css" name="sort" value={this.state.sort} onChange={this.handleInputChange}>
					{this.props.options.map((item) => <option value={item}>{item}</option>)}
				</select>
			</form>
		);
	}
}

// const CustomSelect = ({style}) => {
// 	return(
// 		<div className="CustomSelect">
// 		<label htmlFor="sortmethod">sort by:</label>
// 			<select className="select-css" name="sortmethod">
// 				  <option disabled hidden selected>select an option</option>
// 				  <option>Name</option>
// 				  <option>Time since watered</option>
// 				  <option>Time to next water</option>
// 				  <option>Location</option>
// 			</select>
// 		</div>
// 	)
// }

export default CustomSelect;

