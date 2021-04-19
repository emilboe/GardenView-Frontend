import React, { Component } from 'react';
import Userlist from '../Userlist/Userlist';
import MiniProfile from '../MiniProfile/MiniProfile';
import './Dashboard.css'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (
            <div className="container">
                <div className="dashboardHeader">
                    <h1>Dashboard</h1>
                    <p>Manager Dashboard</p>
                </div>
                <div className="dashboardContent">
                    <Userlist users={this.props.users} />
                    <MiniProfile /> 
                </div>
            </div>
        );
    }
}

export default Dashboard;