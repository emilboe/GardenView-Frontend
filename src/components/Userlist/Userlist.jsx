import React, { Component } from 'react';
import './Userlist.css'
import UserRow from '../UserRow/UserRow';

class Userlist extends Component {

    constructor(props) {
        super(props);
        this.state = { editIsOpen: false };
    }

    render() {
        const users = this.props.users
        const list = users.map(user => (
            <UserRow user={user} />
        ));

        return (
            <div className="userlistContainer">
                <table>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    {list}
                </table>
            </div>
        )
    }
}

export default Userlist;
