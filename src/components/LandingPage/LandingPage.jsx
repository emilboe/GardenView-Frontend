import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PlantCard from '../PlantCard/plantcard.jsx';
// import plants from './plants.json'
import { fetchPlants } from '../../api/plants';
import './LandingPage.css'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      
        return (
            <div className='container LandingPage'>
                <h1>Garden View</h1>
                <p>GardenView is a website created by a group of 4 students at the Norwegian University of Science and Technology using the react library.</p>
            </div>
        );
    }
}

export default Dashboard;