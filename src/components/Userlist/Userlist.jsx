import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from "react-router-dom";
import { editPlant } from '../../api/plants';
import './Userlist.css'
import UserRow from '../UserRow/UserRow';
import { getUser } from '../../helpers/storage';

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
                {/* <button>New User</button> */}

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

// import './Userlist.css'

// const Userlist = ({ users }) => {
//     function capitalize(s) {
//         return s[0].toUpperCase() + s.slice(1);
//     }
//     const list = users.map(user => (
//         <tr>
//             <td>{capitalize(user.firstName)}</td>
//             <td>{capitalize(user.lastName)}</td>
//             <td>{user.email}</td>
//             <td>{capitalize(user.role)}</td>
//             <td className="centerText"><button onClick={this.toggleEdit()}>Edit</button></td>
//         </tr>
//         // <div key={user._id} className="user">
//         //     <div className="content">

//         //         <p>{user.firstName} {user.lastName}</p>
//         //         <p>|</p>
//         // {/* <p>{user.email}</p>
//         //         <p>|</p> */}
//         //         <p>{user.role}</p>
//         //         <button>Edit</button>
//         //         {/* <button className="delete">Delete</button> */}
//         //     </div>
//         // </div>
//     ))

//     return (
//         <div className="userlistContainer">
//             {/* <button>New User</button> */}
//             <table>
//                 <tr>
//                     <th>Firstname</th>
//                     <th>Lastname</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Actions</th>
//                 </tr>
//                 {list}
//             </table>
//         </div>
//     )
// }

// export default Userlist;