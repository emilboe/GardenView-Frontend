import './PlantCard.css';
import React, { useState } from 'react';
import moment from 'moment';
import Popup from '../Popup/Popup';
import PopupData from '../PopupData/PopupData'
import { killPlant, waterPlant, fertPlant, editPlant } from '../../api/plants';
import { getUser } from '../../helpers/storage';



const PlantCard = ({ data, fetchPlants, reRender }) => {
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
		console.log('popoup!!!')
	}
	const killThisPlant = (id) => {
		try {
			killPlant(id)
			fetchPlants()
			reRender()
		} catch (err) {
			console.log('Nah, cant kill');
		}
	}
	const waterThisPlant = (id) => {
		try {
			// console.log(id, user.firstName)
			waterPlant(id, user.firstName)
			fetchPlants()
			reRender()
		} catch (err) {
			console.log('Nah, cant water');
		}
	}
	const fertilizeThisPlant = (id) => {
		try {
			console.log(id, 'fertilized pog')
			fertPlant(id, user.firstName)
			fetchPlants()
			reRender()
		} catch (err) {
			console.log('Nah, cant fert');
		}
	}
	const editThisPlant = (id, formData) => {
		try {
			console.log(id, 'fertilized pog')
			editPlant(id, formData)
			fetchPlants()
			reRender()
		} catch (err) {
			console.log('Nah, cant fert');
		}
	}

	const convertDate = (data) => {
		const time = data;
		return JSON.stringify(moment(time).format('dddd DD/MM')).replace(/\"/g, "");
	}

	const daysUntil = (data) => {
		var a = moment();
		var b = moment(data.last_watering_date);
		var differnce = a.diff(b, 'days', true);
		return (Math.floor(data.schedule - differnce));
	}

	const consistencyCheck = (data) => {
		const dataIn = daysUntil(data);
		if (dataIn >= 3) { return { message: `${dataIn} days until next watering`, style: '' } }
		if (dataIn <= 2) { return { message: `${dataIn} days until next watering`, style: 'warning' } }
		else if (dataIn < 0) { return { message: `should've been watered ${(dataIn * -1)} days ago`, style: 'warning' } }
	}

	const progressValue = (data) => {
		return (data.schedule - daysUntil(data));
	}
	const user = getUser()
	const progressData = consistencyCheck(data)
	console.log('prog', progressData)

	return (
		<>
			<div className={`wrapper ${progressData.style}`} onClick={togglePopup}>
				{user && user.role === 'manager' && <img src="assets/ell.svg" className="ellipse" alt="" />}

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
				<progress color="#8ccc62" max={data.schedule} value={progressValue(data)} aria-valuemax={data.schedule} aria-valuemin="0" aria-valuenow={data.schedule - daysUntil(data)} tabIndex="-1"></progress>
				<p className="progressText">{progressData.message}</p>

			</div>
			{isOpen &&
				<Popup
					content={<PopupData info={data} kill={killThisPlant} water={waterThisPlant} fert={fertilizeThisPlant} edit={editThisPlant}/>}
					handleClose={togglePopup}
				/>}
		</>
	)
}

export default PlantCard