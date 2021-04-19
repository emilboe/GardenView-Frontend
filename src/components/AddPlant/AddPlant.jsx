import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { addPlant } from '../../api/plants';
import { getUser } from '../../helpers/storage';
import './AddPlant.css'


class AddPlant extends Component {

    constructor(props) {
        super(props);
        this.state = { redirect: false, error: '', plant_name: '', location: '', schedule: '', bio: '', icon: '1' };
        this.form = React.createRef();
    }

    handleAddPlant = async (event) => {
        event.preventDefault();

        //This should implement a better validation
        if (this._validate()) {
            const { plant_name, location, schedule, bio, icon } = this.state
            console.log({ plant_name, location, schedule, bio, icon })
            const user = getUser()
            const res = await addPlant({ plant_name, location, schedule, bio, icon, watered_by: user.firstName});
            if (res.error) {
                this.setState({ error: res.error })
            }
            else {
                this.setState({ redirect: '/gardenview' }, () => {
                    console.log('pog new plant')
                    // this.props.onLoginSuccess();
                });
            }
        }
        else {
            this.setState({ error: 'The form is not valid' });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    _validate() {
        return this.form.current.reportValidity();
    }

    render() {
        if (this.state.redirect)
            return (<Redirect to={this.state.redirect} />);

        return (
            <div className="container">
                <h1>Add Plant</h1>
                <form ref={this.form} onSubmit={this.handleAddPlant} className="form">
                    <label>Plant Name </label>
                    <input type="text" name="plant_name" value={this.state.plant_name} onChange={this.handleInputChange} required />

                    <label>Location</label>
                    <input type="text" name="location" value={this.state.location} onChange={this.handleInputChange} required />

                    <label>Schedule</label>
                    <input type="number" name="schedule" value={this.state.schedule} onChange={this.handleInputChange} required />

                    <label>Information</label>
                    <textarea type="text" name="bio" rows="4" cols="50" value={this.state.bio} onChange={this.handleInputChange} required />

                    <label>Icon</label>
                    <select name="icon" defaultValue="1" value={this.state.icon} onChange={this.handleInputChange} required>
                        <option name="1" value="1">1</option>
                        <option name="2" value="2">2</option>
                        <option name="3" value="3">3</option>
                        <option name="4" value="4">4</option>
                    </select>

                    <button type="submit">Add plant</button>
                </form>
                {this.state.error && <div>{this.state.error}</div>}
            </div>
        );
    }
}

export default AddPlant;