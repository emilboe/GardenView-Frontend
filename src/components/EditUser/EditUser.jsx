import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from "react-router-dom";
import { editUser, fetchUsers } from '../../api/users';
import { AuthContext } from '../../helpers/Auth';
import { getUser } from '../../helpers/storage';
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
        //This should implement a better validation
        if (role || firstName || lastName || email) {
            const formData = { id: this.props.info._id }
            if (role) formData.role = role
            if (firstName) formData.firstName = firstName
            if (lastName) formData.lastName = lastName
            // if (email) formData.email = email

            // const headers = this.context.generateHeaders();
            // console.log('headers in edit', headers.headers)
            // const res = await editUser({headers: {Authorization: headers.headers.Authorization}});
            const res = await editUser(formData);
            console.log(res.data)

            // const res = await fetchUsers(headers);

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

        // if (this.state.redirect)
        //     return (<h1>Plant added!</h1>);
        // const convertDate = (time) => {
        //     return JSON.stringify(moment(time).format('dddd DD/MM hh:mm:ss')).replace(/\"/g, "");
        // }
        const user = getUser()
        const { firstName, lastName, role, email, _id } = this.props.info
        // console.log(this.props.info)

        return (
            <>
                <div class="popupInfo">
                    <h1>Edit {firstName}s profile</h1>
                    <div className="popupContent">

                        <>
                            <form className="editForm" onSubmit={(e) => this.handleSubmit(e, _id)}>
                                <label>First Name</label>
                                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                                {/* <label>Email</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} /> */}
                                <label>Role</label>
                                <select name="role" value={this.state.role} onChange={this.handleInputChange}>
                                    <option value="user">user</option>
                                    <option value="gardener">gardener</option>
                                    <option value="manager">manager</option>
                                </select>
                                <input className="submitBtn" type="submit" value="Save Changes" />
                                <span>{this.state.message && this.state.message}</span>
                            </form>
                        </>

                        {/* <div className="rightImg">
                            <img src={`assets/plant${icon}.png`} alt="plant" />
                        </div> */}
                    </div>

                    <div className="buttons">
                        <button className="delete" onClick={() => this.props.kill(_id)}>Delete {firstName}</button>
                    </div>
                </div>

            </>
        )
    }
}

export default EditUser;
