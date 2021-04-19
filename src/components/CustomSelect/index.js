import './CustomSelect.css';


const CustomSelect = ({style}) => {
	return(
		<div className="CustomSelect">
		<label htmlFor="sortmethod">sort by:</label>
			<select className="select-css" name="sortmethod">
				  <option disabled hidden selected>select an option</option>
				  <option>Name</option>
				  <option>Time since watered</option>
				  <option>Time to next water</option>
				  <option>Location</option>
			</select>
		</div>
	)
}

export default CustomSelect;

