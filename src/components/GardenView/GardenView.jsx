import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CustomSelect from '../CustomSelect/';
import PlantCard from '../PlantCard/plantcard.jsx';
// import plants from './plants.json'
import { fetchPlants } from '../../api/plants';
import './GardenView.css'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }
    async componentDidMount() {
        const res = await fetchPlants();
        console.log('Plants have been fetched', res.data);
        if (res.error) {
            this.setState({ error: res.error });
        }
        else {
            this.setState({ data: res.data, isFetching: false, error: null });
        }
    }

    render() {
        const { firstName, lastName, role } = this.props.user;

        const manager = role === 'manager';

        const isAuth = this.props.isAuth;

        const data = this.state.data
        // console.log(data)
        return (
            <div className='plantContainer'>
                <div className="content-wrapper">
                    <div className="segment-header">
                        <h1 className="segment-title">Plant Overview</h1>
                        {manager && <Link to="/addPlant"><button>Add plant</button></Link>}

                        <CustomSelect />
                    </div>
                    <div className="plantView">
                        {data && data.length > 0 && data.map((item) => <PlantCard data={item} key={item.id} />)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;