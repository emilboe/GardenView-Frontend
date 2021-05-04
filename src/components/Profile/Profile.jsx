// import axios from 'axios';
import React, { Component } from 'react';
import { AuthContext } from '../../actions/Auth';
import MiniProfile from '../MiniProfile/MiniProfile';
import './Profile.css'


class Profile extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {}
    }

    // async componentDidMount() {
    //     const headers = this.context.generateHeaders();
    //     console.log(headers)
    //     const res = await fetchUsers(headers);
    //     console.log('Users have been fetched', res);
    //     if(res.error){
    //         this.setState({ error: res.error });
    //     }
    //     else {
    //         this.setState({ data: res.data, isFetching: false, error: null });
    //     }
    // }

    render() {
        return (
            <div className="profileContainer">
                <div className="profileHeader">
                    <h1 className="segment-title">Profile</h1>
                </div>
                <MiniProfile />
            </div>

        );
    }
}

export default Profile;