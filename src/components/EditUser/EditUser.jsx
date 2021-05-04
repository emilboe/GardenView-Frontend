import React, { Component } from 'react';
import { editUser } from '../../api/users';
import { AuthContext } from '../../actions/Auth';
import './EditUser.css'

class EditUser extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = { formIsOpen: false, role: '', email: '', firstName: '', lastName: '', message: '' };
        this.form = React.createRef();
    }
    componentDidMount() {
        console.log('yeehaw', this.props.info)
        this.setState(this.props.info)
    }
    togglePopup() {
        this.setState({ formIsOpen: !this.state.formIsOpen })
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event, id) => {
        event.preventDefault();

        const { role, firstName, lastName, email } = this.state

        if (role || firstName || lastName || email) {
            const formData = { id: this.props.info._id }
            if (role) formData.role = role
            if (firstName) formData.firstName = firstName
            if (lastName) formData.lastName = lastName

            const res = await editUser(formData);
            console.log(res.data)

            if (res.data.message) {
                this.setState({ message: res.data.message })
            }
            else {
                console.log('ok wtf')
            }
        }
        else {
            this.setState({ error: "You didn't enter anything..." });
        }
    }

    render() {
        const { firstName, _id } = this.props.info
        return (
            <div class="popupInfo">
                <h1>Edit {firstName}s profile</h1>
                <div className="popupContent">
                    <form className="editForm w100" onSubmit={(e) => this.handleSubmit(e, _id)}>
                        <label>First Name</label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                        <label>Role</label>
                        <select name="role" value={this.state.role} onChange={this.handleInputChange}>
                            <option value="user">user</option>
                            <option value="gardener">gardener</option>
                            <option value="manager">manager</option>
                        </select>
                        <input className="submitBtn" type="submit" value="Save Changes" />
                        <span>{this.state.message && this.state.message}</span>
                    </form>
                </div>

                <div className="buttons">
                    <button className="delete" onClick={() => this.props.kill(_id)}>Delete {firstName}</button>
                </div>
            </div>
        )
    }
}

export default EditUser;
