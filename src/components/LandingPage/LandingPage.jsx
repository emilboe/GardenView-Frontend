import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CustomSelect from '../CustomSelect/';
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
            <div className='container'>
                <h1>Landing Page</h1>
            </div>
        );
    }
}

export default Dashboard;