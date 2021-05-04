import React, { Component } from 'react';
import Popup from '../Popup/Popup';
import EditUser from '../EditUser/EditUser';
import { getUser } from '../../actions/storage';
import './UserRow.css'


class UserRow extends Component {

    constructor(props) {
        super(props);
        this.state = { editIsOpen: false };
    }
    toggleEdit() {
        this.setState({ editIsOpen: !this.state.editIsOpen })
        console.log('edit toggled')
    }

    killThisUser = id => {
        try {
            console.log('kill', id)
            // killPlant(id)
            // fetchPlants()
            // reRender()
        } catch (err) {
            console.log('Nah, cant kill');
        }
    }

    render() {

        function capitalize(s) {
            return s[0].toUpperCase() + s.slice(1);
        }
        const user = this.props.user
        const userData = getUser()
        const manager = userData.role === 'manager';
        const editIsOpen = this.state.editIsOpen

        return (
            <>
                <tr>
                    <td>{capitalize(user.firstName)}</td>
                    <td>{capitalize(user.lastName)}</td>
                    <td>{user.email}</td>
                    <td>{capitalize(user.role)}</td>
                    <td className="centerText">
                        <button className="form-btn" onClick={() => this.toggleEdit()}>Edit</button>
                    </td>

                </tr>
                {
                    manager && editIsOpen &&
                    <Popup
                        content={<EditUser info={user} kill={this.killThisUser} />}
                        handleClose={this.toggleEdit.bind(this)}
                        redirect='none'
                    />
                }
            </>
        )
    }
}

export default UserRow;
