import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { Redirect, Link } from "react-router-dom";

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = { redirect: false, error: '', firstName: '', lastName: '', email: '', password: '', password2: '' };
        this.form = React.createRef();
    }

    handleLogOut = () => {
        this.context.logout();
    }

    handleRegister = async (event) => {
        event.preventDefault();
        const { valid, error } = this._validate()
        this.setState({ error: error });

        //This should implement a better validation
        if (valid) {

            const { firstName, lastName, email, password } = this.state
            console.log(this.state)
            const res = await this.context.register({ firstName, lastName, email, password, role: 'user' });

            if (res.error) {
                this.setState({ error: res.error })
            }
            else {
                this.setState({ redirect: '/login' }, () => {
                    // this.props.onLoginSuccess();
                });
            }
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    _validate() {
        const { password, password2 } = this.state
        const formOk = this.form.current.reportValidity();
        if (!formOk) return { valid: false, error: 'form invalid' }
        if (password !== password2) return { valid: false, error: 'passwords do not match' }
        console.log('formok', formOk)
        return { valid: true, error: '' }
    }

    render() {
        if (this.state.redirect)
            return (<Redirect to={this.state.redirect} />);

        return (
            <div className="container">
                <h1>Register</h1>
                {/* {this.context.isAuth && <button onClick={this.handleRegister}>Log out</button>} */}
                {!this.context.isAuth &&
                    <form ref={this.form} onSubmit={this.handleRegister} className="form">

                        <label>First Name </label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required />

                        <label>Surname </label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} required />

                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />

                        <label>Password </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />

                        <label>Re-type Password </label>
                        <input type="password" name="password2" value={this.state.password2} onChange={this.handleInputChange} required />

                        <button type="submit">Register</button>
                        <div class="loginOptions">
                            <Link className="link-text" to="/login">Log in</Link>
                            <Link className="link-text" to="/register">Forgot Password?</Link>
                        </div>
                        {this.state.error && <div>{this.state.error}</div>}
                    </form>
                }
            </div>
        );
    }
}

export default Login;