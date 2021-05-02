import React, { Component } from 'react';
import Userlist from '../Userlist/Userlist';
import CustomSelect from '../CustomSelect/CustomSelect';
import './Dashboard.css'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = { users: this.props.users }
        this.handleSortChange('First Name')
    }

    handleSortChange = (sortString) => {
        const sortedUserList = []
        switch (sortString) {
            case 'First Name':
                this.props.users.sort((a, b) => a.firstName.localeCompare(b.firstName))
                break;
            case 'Last Name':
                this.props.users.sort((a, b) => a.lastName.localeCompare(b.lastName))
                break;
            case 'Email':
                this.props.users.sort((a, b) => a.email.localeCompare(b.email))
                break;
            case 'Role':
                this.props.users.sort((a, b) => a.role.localeCompare(b.role))
                break;
            default:
                break;
        }
        this.setState({ users: sortedUserList })
    }
    
    render() {
        const userSorts = ['First Name', 'Last Name', 'Email', 'Role']
        return (
            <div className="container">
                <div className="dashboardHeader">
                    <div className="segment-header">
                        <h1 className="segment-title">All Users</h1>
                        <CustomSelect options={userSorts} sortUpdate={this.handleSortChange} />
                    </div>
                </div>
                <div className="dashboardContent">
                    <Userlist users={this.props.users} />
                </div>
            </div>
        );
    }
}

export default Dashboard;