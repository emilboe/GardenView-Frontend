import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { Link } from "react-router-dom"
import logo from './plantico2.png';
import './Header.css';
// import { getUser } from '../../helpers/storage';

// const INITIAL_STATE = {
//     firstName: '',
//     lastName: '',
//     role: '',
// }

class Header extends Component {
    static contextType = AuthContext;
    
    handleLogOut = () => {
        this.context.logout();
        this.props.onLogoutSuccess();
    }

    render() {

        const { firstName, lastName, role } = this.props.user;

        const manager = role === 'manager';

        const isAuth = this.props.isAuth;

        return (
            <header>
                <nav>
                    <Link className="logo" to="/gardenview">
                        <img src={logo} alt="Plant Logo" />
                        <h1>Garden<br/>View</h1>
                    </Link>
                    <ul>
                        {/* {isAuth && <li><Link className="link-text" to="/profile">Profile</Link></li>} */}
                        {manager && <li><Link className="link-text" to="/dashboard">Userlist</Link></li>}
                        {isAuth && <li><Link className="link-text" to="/profile">{firstName} {lastName}</Link></li>}
                        {!isAuth && <li><Link className="link-text" to="/login">Log in</Link> / <Link className="link-text" to="/register">Register</Link></li>}
                        {isAuth && <li><Link className="link-text" to="/" onClick={this.handleLogOut}>Log out</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    };
}

export default Header;