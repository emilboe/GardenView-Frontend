import React, { Component } from 'react';
import { AuthContext } from '../../actions/Auth';
import { Redirect, Link } from "react-router-dom";
import './forgotPW.css'

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = { redirect: false, error: '', email: '' };
        this.form = React.createRef();
    }

    handleLogOut = () => {
        this.context.logout();
    }

    handleLogIn = async (event) => {
        event.preventDefault();

        //This should implement a better validation
        if (this._validate()) {
            const { email, password } = this.state
            const res = await this.context.login({ email, password });

            if (res.error) {
                this.setState({ error: res.error })
            }
            else {
                this.setState({ redirect: '/profile' }, () => {
                    this.props.onLoginSuccess();
                });
            }
        }
        else {
            this.setState({ error: 'The form is not valid' });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    _validate() {
        return this.form.current.reportValidity();
    }

    render() {
        if (this.state.redirect)
            return (<Redirect to={this.state.redirect} />);

        return (
            <div className="login_container">
                <h1>Forgot Password</h1>
                <form ref={this.form} onSubmit={this.handleLogIn} className="form">
                    <label>Email </label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />


                    <button type="submit">Submit</button>
                    <div class="loginOptions">
                        <Link className="link-text" to="/register">Register</Link>
                        <Link className="link-text" to="/login">Log in</Link>
                    </div>
                </form>
                {this.state.error && <div>{this.state.error}</div>}

            </div>
        );
    }
}

export default Login;