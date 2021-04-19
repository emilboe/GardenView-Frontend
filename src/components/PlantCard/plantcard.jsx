import './PlantCard.css';
import React, { useState } from 'react';
import moment from 'moment';
import Popup from '../Popup/Popup';
import { killPlant } from '../../api/plants';
import { getUser } from '../../helpers/storage';


const convertDate = (data) => {
	const time = data;
	return JSON.stringify(moment(time).format('dddd DD/MM')).replace(/\"/g, "");
}

const daysUntil = (data) => {
	var a = moment();
	var b = moment(data.last_watering_date);
	var diff = a.diff(b, 'days');
	return (data.schedule - diff);
}

const consistencyCheck = (data) => {
	const dataIn = daysUntil(data);
	if (dataIn >= 0) { return { message: `${dataIn} days until next watering`, style: '' } }
	else if (dataIn <= 0) { return { message: `should've been watered ${(dataIn * -1)} days ago`, style: 'warning' } }
}

const killThisPlant = (id) => {
	try {
		killPlant(id)
		// this is an awful implementation, should reload the parent component with prop function probably.
		window.location.reload();
	}catch(err){
		console.log('what')
	}
}

const PlantCard = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
		console.log('popoup!!!')
	}

	const user = getUser()
	const progressData = consistencyCheck(data)

	return (
		<div className={`wrapper ${progressData.style}`}>
			{user && user.role === 'manager' && <img src="assets/ell.svg" className="ellipse" alt="" onClick={togglePopup} />}
			{isOpen &&
				<Popup
					content={<>
						<b>Popup med mer info?</b>
						<p>{data.bio}</p>
						<button onClick={() => killThisPlant(data._id)}>Delete Plant</button>
					</>}
					handleClose={togglePopup}
				/>}
			<div className="hDiv">
				<div className="infoBox">
					<p className="name">{data.plant_name}</p>
					<p className="extra-info"><img src="assets/location.svg" className="textIcon" alt="location icon" />{data.location}</p>
					<p className="extra-info"><img src="assets/person.svg" className="textIcon" alt="person icon" />{data.watered_by}</p>
					<p className="extra-info"><img src="assets/watercan.svg" className="textIcon" alt="watering icon" />{convertDate(data.last_watering_date)}</p>
					<p className="extra-info"><img src="assets/fertilizer.svg" className="textIcon" alt="watering icon" />{convertDate(data.last_fertilizing_date)}</p>
				</div>
				<img src={`assets/plant${data.icon}.png`} alt="plant" className="plantIcon" />
			</div>
			<progress color="#8ccc62" max={data.schedule} value={data.schedule - daysUntil(data)} aria-valuemax={data.schedule} aria-valuemin="0" aria-valuenow={data.schedule - daysUntil(data)} tabIndex="-1"></progress>
			<p className="progressText">{progressData.message}</p>

		</div>
	)
}

export default PlantCard