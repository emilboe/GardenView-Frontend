import React, { Component } from 'react';
import { addPlant } from '../../api/plants';
import { getUser } from '../../helpers/storage';
import plantIcon1 from '../../assets/modern/planticon_1.png'
import plantIcon2 from '../../assets/modern/planticon_2.png'
import plantIcon3 from '../../assets/modern/planticon_3.png'
import plantIcon4 from '../../assets/modern/planticon_4.png'
import plantIcon5 from '../../assets/modern/planticon_5.png'
import plantIcon6 from '../../assets/modern/planticon_6.png'
import plantIcon7 from '../../assets/modern/planticon_7.png'
import plantIcon8 from '../../assets/modern/planticon_8.png'
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
            const res = await addPlant({ plant_name, location, schedule, bio, icon, watered_by: user.firstName, fert_by: user.firstName });
            if (res.error) {
                this.setState({ error: res.error })
            }
            else {
                this.setState({ redirect: '/gardenview' }, () => {
                    console.log('pog new plant')
                    this.props.fetchPlants();
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

    getPlantIcon = (n) => {
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
            case '5':
                planticon = plantIcon5
                break;
            case '6':
                planticon = plantIcon6
                break;
            case '7':
                planticon = plantIcon7
                break;
            case '8':
                planticon = plantIcon8
                break;
            default:
                planticon = plantIcon1
                break;
        }
        return planticon;
    }

    render() {
        if (this.state.redirect)
            return (<h1>Plant added!</h1>);

        return (
            <div className="rowContainer">
                <div className="columnContainer">
                    <h1>Add Plant</h1>
                    <form ref={this.form} onSubmit={this.handleAddPlant} className="form">
                        <label>Plant Name </label>
                        <input autoFocus='autofocus' type="text" name="plant_name" value={this.state.plant_name} onChange={this.handleInputChange} required />

                        <label>Location</label>
                        <input type="text" name="location" value={this.state.location} onChange={this.handleInputChange} required />

                        <label>Schedule</label>
                        <input type="number" name="schedule" value={this.state.schedule} onChange={this.handleInputChange} required />

                        <label>Information</label>
                        <textarea type="text" name="bio" rows="4" cols="50" value={this.state.bio} onChange={this.handleInputChange} required />

                        <label>Icon</label>
                        <select name="icon" value={this.state.icon} onChange={this.handleInputChange} required>
                            <option name="1" value="1">1</option>
                            <option name="2" value="2">2</option>
                            <option name="3" value="3">3</option>
                            <option name="4" value="4">4</option>
                        </select>

                        <button type="submit">Add plant</button>
                    </form>
                    {this.state.error && <div>{this.state.error}</div>}
                </div>

                <div className="columnContainer">
                    <img src={this.getPlantIcon(this.state.icon)} alt="plant" />
                </div>
            </div>
        );
    }
}

export default AddPlant;