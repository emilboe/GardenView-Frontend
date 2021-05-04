import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import moment from 'moment';
import CustomSelect from '../CustomSelect/CustomSelect';
import PlantCard from '../PlantCard/plantcard.jsx';
import Popup from '../Popup/Popup';
import AddPlant from '../AddPlant/AddPlant';
// import plants from './plants.json'
import { fetchPlants } from '../../api/plants';
import './GardenView.css'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = { isOpen: false, redirect: false, bool: false }
    }
    async componentDidMount() {
        // this.setPlants()
        console.log(this.props)
        if (this.props.plants) this.handleSortChange('Next watering')
    }

    redirectUrl = () => {
        console.log('it do be redicredintg')
        this.setState({ redirect: '/gardenview' })
        return <Redirect to="/gardenview" />
    }
    togglePopup() {
        this.setState({ isOpen: !this.state.isOpen });
        console.log('popup toggled')
    }

    async getPlants() {
        const res = await fetchPlants();
        console.log('Plants have been fetched', res.data);
        if (res.error) {
            this.setState({ error: res.error });
        }
        else {
            console.log(res.data)
            this.setState({ plants: res.data, isFetching: false, error: null });
        }
    }


    handleSortChange = (sortString) => {
        const sortedUserList = []

        const daysUntilYo = (plant) => {
            var a = moment();
            var b = moment(plant.last_watering_date);
            var differnce = a.diff(b, 'days', true);
            return (Math.floor(plant.schedule - differnce));
        }

        switch (sortString) {
            case 'Next watering':
                this.props.plants.sort((a, b) => {
                    var aSched = daysUntilYo(a)
                    var bSched = daysUntilYo(b)

                    if (aSched < bSched) return -1
                    else return 1
                })
                break;
            case 'Plant Name':
                this.props.plants.sort((a, b) => a.plant_name.localeCompare(b.plant_name))
                break;
            case 'Location':
                this.props.plants.sort((a, b) => a.location.localeCompare(b.location))
                break;
            case 'Who watered':
                this.props.plants.sort((a, b) => a.watered_by.localeCompare(b.watered_by))
                break;
            default:
                break;
        }
        this.setState({ users: sortedUserList })
    }
    render() {
        const manager = this.props.user.role === 'manager';
        const { isOpen } = this.state
        const { plants } = this.props
        const userSorts = ['Next watering', 'Plant Name', 'Location', 'Who watered']

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className='plantContainer'>
                <div className="content-wrapper">
                    <div className="segment-header">
                        <h1 className="segment-title">Plant Overview</h1>
                        {manager && <button className="loginBtn" onClick={() => this.togglePopup()}>Add plant</button>}
                        {manager && isOpen &&
                            <Popup
                                content={<AddPlant fetchPlants={this.props.getPlants} />}
                                handleClose={() => this.togglePopup()}
                                redirect='none'
                            />}
                        <CustomSelect options={userSorts} sortUpdate={this.handleSortChange} />
                    </div>
                    <div className="plantView">
                        {plants && plants.length > 0 ? plants.map((item) => <PlantCard {...this.props} fetchPlants={() => this.props.getPlants()} urlChange={this.redirectUrl} data={item} key={item._id} />) : 'Plants loading...'}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;