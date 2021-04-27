import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
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
        this.state = { isOpen: false, redirect: false }
    }
    async componentDidMount() {
        this.getPlants()
    }
    async getPlants() {
        const res = await fetchPlants();
        console.log('Plants have been fetched', res.data);
        if (res.error) {
            this.setState({ error: res.error });
        }
        else {
            console.log(res.data)
            this.setState({ data: res.data, isFetching: false, error: null });
            this.handleSortChange('Time until next watering')
        }
    }
    redirectUrl = () => {
        console.log('it do be redicredintg')
        this.setState({ redirect: '/gardenview' })
        return <Redirect to="/gardenview" />
    }
    togglePopup() {
        this.setState({ isOpen: !this.state.isOpen });
        // bad implementation!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.state.isOpen === true) window.location.reload();
        console.log('popup toggled')
    }
    daysUntilYo = (plant) => {
        var a = moment();
        var b = moment(plant.last_watering_date);
        var differnce = a.diff(b, 'days', true);
        return (Math.floor(plant.schedule - differnce));
    }

    handleSortChange = (sortString) => {
        const sortedUserList = []
        // console.log(this.state.data)
        // return
        // not working correctly
        switch (sortString) {
            case 'Time until next watering':
                this.state.data.sort((a, b) => {
                    var aSched = this.daysUntilYo(a)
                    var bSched = this.daysUntilYo(b)
                    
                    if (aSched < bSched) return -1
                    else return 1

                    // const dateA = new Date(a.last_watering_date)
                    // const dateB = new Date(b.last_watering_date)
                    // const today = new Date()

                    // const unixA = dateA.getTime()
                    // const unixB = dateB.getTime()

                    // const unixToday = today.getTime()

                    // const schedA = a.schedule * 24 * 60 * 60 * 60 
                    // const schedB = b.schedule * 24 * 60 * 60 * 60 

                    // const plantA = unixToday - unixA - schedA
                    // const plantB = unixToday - unixB - schedB
                    // console.table('\nunixToday', unixToday)
                    // console.table('dateA', unixA)
                    // console.table('today - unixA', unixToday - unixA)
                    // console.table('schedA', schedA)
                    // console.table('today - unixA - sched :', plantA)
                    // // console.table(a.plant_name, plantA)
                    // if (plantA > plantB) return -1
                    // else return 1
                })
                break;
            case 'Plant Name':
                this.state.data.sort((a, b) => a.plant_name.localeCompare(b.plant_name))
                break;
            case 'Location':
                this.state.data.sort((a, b) => a.location.localeCompare(b.location))
                break;
            case 'Who watered':
                this.state.data.sort((a, b) => a.watered_by.localeCompare(b.watered_by))
                break;
            default:
                break;
        }
        this.setState({ users: sortedUserList })
    }
    render() {
        const { firstName, lastName, role } = this.props.user;
        const manager = role === 'manager';
        const isAuth = this.props.isAuth;
        const { isOpen, data } = this.state
        const userSorts = ['Next watering', 'Plant Name', 'Location', 'Who watered']
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        // console.log(data)
        return (
            <div className='plantContainer'>
                <div className="content-wrapper">
                    <div className="segment-header">
                        <h1 className="segment-title">Plant Overview</h1>
                        {manager && <button className="loginBtn" onClick={() => this.togglePopup()}>Add plant</button>}
                        {manager && isOpen &&
                            <Popup
                                content={<AddPlant fetchPlants={this.getPlants.bind(this)} />}
                                handleClose={() => this.togglePopup()}
                                redirect='none'
                            />}
                        {/* {manager && <Link to="/addPlant"><button>Add plant</button></Link>} */}

                        <CustomSelect options={userSorts} sortUpdate={this.handleSortChange} />
                    </div>
                    <div className="plantView">
                        {data && data.length > 0 ? data.map((item) => <PlantCard {...this.props} fetchPlants={this.getPlants.bind(this)} reRender={this.render} urlChange={this.redirectUrl} data={item} key={item._id} />): 'Plants loading...'}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;