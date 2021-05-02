import React, { Component } from 'react';
import moment from 'moment';
import { fetchPlants, killPlant, waterPlant, fertPlant, editPlant } from '../../api/plants';
import { getUser } from '../../helpers/storage';
import './PopupData.css'
import plantIcon1 from '../../assets/plant1.png'
import plantIcon2 from '../../assets/plant2.png'
import plantIcon3 from '../../assets/plant3.png'
import plantIcon4 from '../../assets/plant4.png'


class PopupData extends Component {

    constructor(props) {
        super(props);
        this.state = { formIsOpen: false, bool: false, msg: '', updated: '', inputfocus: true, bio: '', location: '', schedule: '', icon: '', plant_name: '', user: getUser() };
        this.form = React.createRef();

    }
    componentDidMount() {
        this.getPlants()
    }
    togState() {
        this.getPlants()
        this.setBestplant()
        this.setState({ bool: !this.state.bool });
        console.log('bool toggled')
    }
    setBestplant() {
        this.state.plants.map(plant => {
            if (plant._id === this.props.match.params.id) {
                console.log('plant', plant)
                this.setState(plant)
                return false
            }
            return false
        })
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log('name', name)
        console.log('value', value)
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
            }
        }
        else {
            this.setState({ error: "You didn't enter anything..." });
        }
    }
    killThisPlant = (id) => {
        try {
            killPlant(id)
            console.log(this.props)
            // this.props.upDoot()
        } catch (err) {
            console.log('Nah, cant kill');
        }
        this.props.getPlants()
    }
    waterThisPlant = (id) => {
        console.log('id and username:', id, this.state.user.firstName)
        try {
            // this.setState({ last_watering_date: new Date() })
            waterPlant(id, this.state.user.firstName)
            this.setState({ msg: "Plant watered!" });
        } catch (err) {
            console.log('Nah, cant water');
            this.setState({ msg: "watering failed..." });
        }
        this.togState()
        this.props.getPlants()
    }
    fertilizeThisPlant = (id) => {
        try {
            console.log(id, 'fertilized pog')
            fertPlant(id, this.state.user.firstName)
            this.setState({ msg: "Plant fertilized!" });
        } catch (err) {
            this.setState({ msg: "Fertilization failed" });
        }
        this.togState()
        this.props.getPlants()
    }
    editThisPlant = (id, formData) => {
        try {
            console.log(id, 'fertilized pog')
            editPlant(id, formData)
            this.setState({ msg: "Plant edited!" });
        } catch (err) {
            this.setState({ msg: "Edit failed..." });
        }
    }

    async getPlants() {
        const res = await fetchPlants();
        console.log('Plants have been fetched in popupdata', res.data);
        if (res.error) {
            return this.setState({ error: res.error });
        }
        else {
            this.setState({ plants: res.data, isFetching: false, error: null });
            this.setBestplant()
        }
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
            default:
                planticon = plantIcon1
                break;
        }
        return planticon;
    }

    togglePopup() {
        this.setState({ formIsOpen: !this.state.formIsOpen })
    }

    componentDidUpdate() {
        // console.log('comp did update')
        if (!this.state.formIsOpen) {
            const waterBtn = document.getElementById('waterBtn')
            if (waterBtn) {
                // console.log('waterBtn exists')
                waterBtn.focus()
            }
        }
    }

    render() {
        console.log('popupdata state', this.state)
        if (!this.state.plants) {
            console.log('poppstate hasnt fetched yet')
            return (
                <h1>Loading plant...</h1>
            )
        }
        const { match: { params } } = this.props;
        console.log('id', params.id)
        if (this.state.redirect)
            return (<h1>Plant added!</h1>);
        const convertDate = (time) => {
            return JSON.stringify(moment(time).format('dddd DD/MM hh:mm:ss')).replace(/"/g, "");
        }



        const { plant_name, bio, location, _id, icon, last_fertilizing_date, last_watering_date, schedule, watered_by, fertilized_by } = this.state
        // console.log('state: ', this.state)

        const user = this.state.user
        var manager = false;
        var gardener = false;
        var bossman = false;
        if (user) {
            manager = user.role === 'manager'
            gardener = user.role === 'gardener'
            bossman = manager || gardener;
        }

        return (
            <div class="popupInfo" >
                <h1>{plant_name}</h1>
                <div className="popupContent" id="currentPopup">
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
                            <form className='form' onSubmit={(e) => this.handleSubmit(e, _id)}>
                                <h1>Edit Plant</h1>
                                <label>Plant Name</label>
                                <input autoFocus='autofocus' type="text" name="plant_name" id="firstInput" value={plant_name} onChange={this.handleInputChange} />
                                <label>Icon</label>
                                <input type="number" min="1" max="4" name="icon" value={icon} onChange={this.handleInputChange} />
                                <label>Bio</label>
                                <textarea type="text" name="bio" value={bio} onChange={this.handleInputChange} />
                                <label>Location</label>
                                <input type="text" name="location" value={location} onChange={this.handleInputChange} />
                                <label>Schedule</label>
                                <input type="number" name="schedule" value={schedule} onChange={this.handleInputChange} />
                                <input className="submitBtn" type="submit" value="Save Changes" />
                                <span>{this.state.error && this.state.error}</span>
                            </form>
                        </>

                    )
                    }

                    <div className="rightImg">
                        <img src={this.getPlantIcon(icon)} alt="plant" />
                    </div>
                </div>
                {bossman &&
                    <div className="buttons">
                        {bossman && <button id="waterBtn" className="water" onClick={() => this.waterThisPlant(_id)}>Water Plant</button>}
                        {bossman && <button className="fertilize" onClick={() => this.fertilizeThisPlant(_id)}>Fertilize Plant</button>}
                        {bossman && <button onClick={this.togglePopup.bind(this)}>Edit Plant</button>}
                        {manager && <button className="delete" onClick={() => this.killThisPlant(_id)}>Delete Plant</button>}
                    </div>
                }
                {this.state.msg && <p className="popupMessage">{this.state.msg}</p>}
            </div>
        )
    }
}

export default PopupData;
