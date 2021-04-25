import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from "react-router-dom";
import { editPlant } from '../../api/plants';
import { getUser } from '../../helpers/storage';
import './PopupData.css'


class PopupData extends Component {

    constructor(props) {
        super(props);
        this.state = { formIsOpen: false, bio: '', location: '', schedule: '', icon: '', plant_name: '' };
        this.form = React.createRef();
    }
    componentDidMount() {
        // console.log('yeehaw', this.props.info)
        this.setState(this.props.info)
    }
    togglePopup() {
        this.setState({ formIsOpen: !this.state.formIsOpen })
        // this.props.history.push('/gardenview')
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event, id) => {
        event.preventDefault();

        const { bio, location, schedule, icon, plant_name } = this.state
        //This should implement a better validation
        if (bio || location || schedule || icon || plant_name) {
            const formData = {}
            if (bio) formData.bio = bio
            if (location) formData.location = location
            if (schedule) formData.schedule = schedule
            if (icon) formData.icon = icon
            if (plant_name) formData.plant_name = plant_name
            // console.log(formData)
            const res = await editPlant({ id, formData });

            if (res.error) {
                this.setState({ error: res.error })
            }
            else {
                this.togglePopup()
                // this.setState({ redirect: '/gardenview' }, () => {
                //     // this.props.onLoginSuccess();
                // });
            }
        }
        else {
            this.setState({ error: "You didn't enter anything..." });
        }
    }

    render() {

        if (this.state.redirect)
            return (<h1>Plant added!</h1>);
        const convertDate = (time) => {
            return JSON.stringify(moment(time).format('dddd DD/MM hh:mm:ss')).replace(/\"/g, "");
        }
        const { plant_name, bio, location, _id, icon, last_fertilizing_date, last_watering_date, schedule, watered_by, fertilized_by } = this.props.info
        // console.log(this.props.info)
        const user = getUser()
        var manager = false;
        var gardener = false;
        var bossman = false;
        if (user) {
            manager = user.role === 'manager'
            gardener = user.role === 'gardener'
            bossman = manager || gardener;
        }
        return (
            <>
                <div class="popupInfo">
                    <h1>{plant_name}</h1>
                    <div className="popupContent">
                        {!this.state.formIsOpen ? (
                            <ul className="indented">
                                <li><b>Bio:</b> {bio}</li>
                                <li><b>Current Location:</b> {location}</li>
                                <li><b>Last fertilizing date:</b> {convertDate(last_fertilizing_date)}</li>
                                <li><b>Laste watering date:</b> {convertDate(last_watering_date)}</li>
                                <li>Must be watered every <b>{schedule} days</b></li>
                                <li><b>Last watered by:</b> {watered_by}</li>
                                <li><b>Last fertilized by:</b> {fertilized_by}</li>
                            </ul>
                        ) : (
                            <>
                                <form className="editForm" onSubmit={(e) => this.handleSubmit(e, _id)}>
                                    <h1>Edit Plant</h1>
                                    <label>Plant Name</label>
                                    <input type="text" name="plant_name" value={this.state.plant_name} onChange={this.handleInputChange} />
                                    <label>Icon</label>
                                    <input type="number" name="icon" value={this.state.icon} onChange={this.handleInputChange} />
                                    <label>Bio</label>
                                    <textarea type="text" name="bio" value={this.state.bio} onChange={this.handleInputChange} />
                                    <label>Location</label>
                                    <input type="text" name="location" value={this.state.location} onChange={this.handleInputChange} />
                                    <label>Schedule</label>
                                    <input type="number" name="schedule" value={this.state.schedule} onChange={this.handleInputChange} />
                                    <input className="submitBtn" type="submit" value="Save Changes" />
                                    <span>{this.state.error && this.state.error}</span>
                                </form>
                            </>

                        )
                        }

                        <div className="rightImg">
                            <img src={`../assets/plant${icon}.png`} alt="plant" />
                        </div>
                    </div>
                    {bossman &&
                        <div className="buttons">
                            {manager && <button className="delete" onClick={() => this.props.kill(_id)}>Delete Plant</button>}
                            {bossman && <button className="water" onClick={() => this.props.water(_id)}>Water Plant</button>}
                            {bossman && <button className="fertilize" onClick={() => this.props.fert(_id)}>Fertilize Plant</button>}
                            {bossman && <button onClick={this.togglePopup.bind(this)}>Edit Plant</button>}
                        </div>
                    }
                </div>

            </>
        )
    }
}

export default PopupData;
