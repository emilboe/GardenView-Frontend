import './PlantCard.css';
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import moment from 'moment';
import { getUser } from '../../helpers/storage';
import locationIcon from '../../assets/location.svg'
import personIcon from '../../assets/person.svg'
import waterIcon from '../../assets/watercan.svg'
import fertIcon from '../../assets/fertilizer.svg'
import plantIcon1 from '../../assets/plant1.png'
import plantIcon2 from '../../assets/plant2.png'
import plantIcon3 from '../../assets/plant3.png'
import plantIcon4 from '../../assets/plant4.png'



const PlantCard = ({ data, fetchPlants, reRender, urlChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);
	let history = useHistory()
	const togglePopup = () => {
		// setRedirect(true)
		setIsOpen(!isOpen);
		// console.log('yeehaw')
		// if (isOpen) urlChange()
		// console.log('popoup!!!')
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
		if (dataIn <= 2 && dataIn > 0) { return { message: `${dataIn} days until next watering`, style: 'warning' } }
		if (dataIn === 0) { return { message: `Should be watered today!`, style: 'warning' } }
		if (dataIn < 0) { return { message: `should've been watered ${(dataIn * -1)} days ago`, style: 'warning' } }
	}

	const getPlantIcon = (n) => {
		// console.log('we out here gttin planticon', n)
		var planticon;
		switch (n) {
			case '1':
				planticon = plantIcon1
				break;
			case '2':
				planticon = plantIcon2
				break;
			case '3':
				planticon = plantIcon3
				break;
			case '4':
				planticon = plantIcon4
				break;
			default:
				planticon = plantIcon1
				break;
		}
		return planticon;
	}
	const progressValue = (data) => {
		return (data.schedule - daysUntil(data));
	}
	const keypress = (e) => {
		console.log('wow u pressed key')
		if (e.keyCode == 13) {
			console.log('wow its enter')
			history.push(`/gardenview/${data._id}`)
			return false;
		}
	}
	const user = getUser()
	const progressData = consistencyCheck(data)
	// console.log('prog', progressData)

	if (redirect) {
		// <Redirect to={`/gardenview/${data._id}`} />
	}
	return (

		<>
			{/* <Link to={`/gardenview/${data._id}`}> */}

			<div className={`wrapper ${progressData.style}`}
				onKeyDown={keypress}
				onClick={() => {
					console.log('hsitory', history)
					history.push(`/gardenview/${data._id}`)
				}}
				tabIndex={0}>
				{/* {user && user.role === 'manager' && <img src="assets /ell.svg" className="ellipse" alt="" />} */}

				<div className="hDiv">
					<div className="infoBox">
						<p className="name">{data.plant_name}</p>
						<p className="extra-info"><img src={locationIcon} className="textIcon" alt="location icon" />{data.location}</p>
						<p className="extra-info"><img src={personIcon} className="textIcon" alt="person icon" />{data.watered_by}</p>
						<p className="extra-info"><img src={waterIcon} className="textIcon" alt="watering icon" />{convertDate(data.last_watering_date)}</p>
						<p className="extra-info"><img src={fertIcon} className="textIcon" alt="watering icon" />{convertDate(data.last_fertilizing_date)}</p>
					</div>
					<img src={getPlantIcon(data.icon)} alt="plant" className="plantIcon" />
					{/* {console.log(getPlantIcon(data.icon))} */}
				</div>
				<progress
					color="#8ccc62"
					max={data.schedule}
					value={daysUntil(data) + 1}
					aria-valuemax={data.schedule}
					aria-valuemin="0"
					aria-valuenow={data.schedule - daysUntil(data)}
					tabIndex="-1"
					className={`prog${progressData.style}`}
				/>
				<p className="progressText">{progressData.message}</p>

			</div>
			{/* {isOpen &&
				<Popup
					content={<PopupData info={data} kill={killThisPlant} water={waterThisPlant} fert={fertilizeThisPlant} edit={editThisPlant} />}
					handleClose={togglePopup}
				/>} */}
			{/* {isOpen && <Redirect to={`/gardenview/${data._id}`} />} */}
			{/* {!isOpen && <Redirect to={`/gardenview`} />} */}

			{/* </Link> */}
		</>
	)
}

export default PlantCard