import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CustomSelect from '../CustomSelect/';
import PlantCard from '../PlantCard/plantcard.jsx';
import Popup from '../Popup/Popup';
import AddPlant from '../AddPlant/AddPlant';
// import plants from './plants.json'
import { fetchPlants } from '../../api/plants';
import './GardenView.css'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = { isOpen: false }
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
        }
    }

    togglePopup() {
        this.setState({ isOpen: !this.state.isOpen });
        if (this.state.isOpen === true) window.location.reload();
        console.log('popoup!!!')
    }

    render() {
        const { firstName, lastName, role } = this.props.user;

        const manager = role === 'manager';

        const isAuth = this.props.isAuth;

        const { isOpen, data } = this.state
        // console.log(data)
        return (
            <div className='plantContainer'>
                <div className="content-wrapper">
                    <div className="segment-header">
                        <h1 className="segment-title">Plant Overview</h1>
                        {manager && <button onClick={() => this.togglePopup()}>Add plant</button>}
                        {manager && isOpen &&
                            <Popup
                                content={<AddPlant fetchPlants={this.getPlants.bind(this)}/>}
                                handleClose={() => this.togglePopup()}
                            />}
                        {/* {manager && <Link to="/addPlant"><button>Add plant</button></Link>} */}

                        <CustomSelect />
                    </div>
                    <div className="plantView">
                        {data && data.length > 0 && data.map((item) => <PlantCard fetchPlants={this.getPlants.bind(this)} reRender={this.render} data={item} key={item.id} />)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;