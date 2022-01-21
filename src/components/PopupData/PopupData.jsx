import React, { Component } from 'react';
import moment from 'moment';
import { fetchPlants, killPlant, waterPlant, fertPlant, editPlant } from '../../api/plants';
import { getUser } from '../../actions/storage';
import './PopupData.css'
import plantIcon1 from '../../assets/modern/planticon_1.png'
import plantIcon2 from '../../assets/modern/planticon_2.png'
import plantIcon3 from '../../assets/modern/planticon_3.png'
import plantIcon4 from '../../assets/modern/planticon_4.png'
import plantIcon5 from '../../assets/modern/planticon_5.png'
import plantIcon6 from '../../assets/modern/planticon_6.png'
import plantIcon7 from '../../assets/modern/planticon_7.png'
import plantIcon8 from '../../assets/modern/planticon_8.png'
var QRCode = require('qrcode.react');

class PopupData extends Component {

    constructor(props) {
        super(props);
        this.state = { formIsOpen: false, QRSize: '40', bool: false, msg: '', updated: '', inputfocus: true, bio: '', location: '', schedule: '', icon: '', plant_name: '', user: getUser() };
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

    QREnlarge() {
        var newSize = '40'
        if (this.state.QRSize === '40') newSize = '256'
        this.setState({ QRSize: newSize })
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
                this.setState({ msg: "Plant edited!" });
                this.togState()
                this.props.getPlants()
                this.togglePopup()
            }
        }
        else {
            this.setState({ error: "You didn't enter anything..." });
        }
    }

    killThisPlant = async (id) => {
        try {
            await killPlant(id)
            console.log(this.props)
            this.setState({ msg: "Plant deleted!" });
            console.log('tryna kill this plant')
            this.props.getPlants()
            // this.props.upDoot()
        } catch (err) {
            console.log('Nah, cant kill');
        }
    }
    waterThisPlant = (id) => {
        console.log('id and username:', id, this.state.user.firstName)
        try {
            waterPlant(id, this.state.user.firstName)
            this.setState({ msg: "Plant watered!" });
            this.togState()
            this.props.getPlants()
        } catch (err) {
            console.log('watering failed..');
            this.setState({ msg: "watering failed..." });
        }
    }

    fertilizeThisPlant = (id) => {
        try {
            console.log(id, 'fertilized pog')
            fertPlant(id, this.state.user.firstName)
            this.setState({ msg: "Plant fertilized!" });
            this.togState()
            this.props.getPlants()
        } catch (err) {
            this.setState({ msg: "Fertilization failed" });
        }
    }
    editThisPlant = (id, formData) => {
        try {
            console.log(id, 'fertilized pog')
            editPlant(id, formData)
            this.setState({ msg: "Plant edited!" });
            this.togState()
            this.props.getPlants()
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

        const user = this.state.user
        var manager = false;
        var gardener = false;
        var bossman = false;
        if (user) {
            manager = user.role === 'manager'
            gardener = user.role === 'gardener'
            bossman = manager || gardener;
        }
        console.log('match url', this.props.match.url)
        return (
            <div class="popupInfo" >
                {!this.state.formIsOpen ? <h1>{plant_name}</h1> : ''}
                <div className="popupContent" id="currentPopup">
                    {!this.state.formIsOpen ? (
                        <ul className="indented">
                            <li><b>Current Location:</b> {location}</li>
                            <li><b>Last fertilizing date:</b> {convertDate(last_fertilizing_date)}</li>
                            <li><b>Laste watering date:</b> {convertDate(last_watering_date)}</li>
                            <li>Must be watered every <b>{schedule} days</b></li>
                            <li><b>Last watered by:</b> {watered_by}</li>
                            <li><b>Last fertilized by:</b> {fertilized_by}</li>
                            <li><b>Information:</b> {bio}</li>
                            <QRCode value={"https://gardenview.netlify.app/#" + this.props.match.url} size={this.state.QRSize} onClick={this.QREnlarge.bind(this)} />
                        </ul>
                    ) : (
                        <>
                            <form className='form' onSubmit={(e) => this.handleSubmit(e, _id)}>
                                <h1>Edit Plant</h1>
                                <label>Plant Name</label>
                                <input autoFocus='autofocus' type="text" name="plant_name" id="firstInput" value={plant_name} onChange={this.handleInputChange} />
                                <label>Icon</label>
                                <input type="number" min="1" max="8" name="icon" value={icon} onChange={this.handleInputChange} />
                                <label>Bio</label>
                                <textarea type="text" name="bio" value={bio} onChange={this.handleInputChange} />
                                <label>Location</label>
                                <input type="text" name="location" value={location} onChange={this.handleInputChange} />
                                <label>Schedule</label>
                                <input type="number" name="schedule" value={schedule} onChange={this.handleInputChange} />
                                <button className="submitBtn" type="submit" >Save Changes</button>
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
