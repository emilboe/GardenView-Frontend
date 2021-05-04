import React, { Component } from 'react';
import { AuthContext } from '../../actions/Auth';
import { Link } from "react-router-dom";
import './Sidebar.css';

class Sidebar extends Component {
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
        	<div className="sidebar">
                    <ul>
                        {/* {isAuth && <li><Link className="link-text" to="/profile">Profile</Link></li>} */}
                        {manager && <li><Link className="link-text" to="/dashboard">Userlist</Link></li>}
                        {isAuth && <li><Link className="link-text" to="/profile">{firstName} {lastName}</Link></li>}
                        {!isAuth && <li><Link className="link-text" to="/login">Log in</Link> / <Link className="link-text" to="/register">Register</Link></li>}
                        {isAuth && <li><Link className="link-text" to="/" onClick={this.handleLogOut}>Log out</Link></li>}
                    </ul>
            </div>
        )
    };
}

export default Sidebar;