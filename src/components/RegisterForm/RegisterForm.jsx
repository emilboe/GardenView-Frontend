import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { Redirect } from "react-router-dom";

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = { redirect: false, error: '', email: '', password: '' };
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
            <div className="container">
                <h1>Register</h1>
                {this.context.isAuth && <button onClick={this.handleLogOut}>Log out</button>}
                {!this.context.isAuth &&
                    <form ref={this.form} onSubmit={this.handleLogIn} className="form">
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />

                        <label>Password </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />

                        <label>Name </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />

                        <label>Password </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />

                        <button type="submit">Log in</button>
                    </form>
                }
                {this.state.error && <div>{this.state.error}</div>}
            </div>
        );
    }
}

export default Login;