import React, { Component } from 'react';
import { AuthContext } from '../../helpers/Auth';
import { Link } from "react-router-dom";
import logo from './plantico2.png';
import './Header.css';
import '../Sidebar/Sidebar.css';
import Sidebar from '../Sidebar/';
import burgerIcon from '../../assets/burger_menu.svg'
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

    state = { showing: false };

    render() {
        const { showing } = this.state;

        const { firstName, lastName, role } = this.props.user;

        const manager = role === 'manager';

        const isAuth = this.props.isAuth;

        return (
            <header>
                <nav>
                    <Link className="logo" to="/">
                        <img src={logo} alt="Plant Logo" />
                        <h1>Garden<br/>View</h1>
                    </Link>
                    <ul>
                        {/* {isAuth && <li><Link className="link-text" to="/profile">Profile</Link></li>} */}
                                    {<li><Link className="link-text" to="/gardenview">garden view</Link></li>}
                        {manager && <li><Link className="link-text" to="/dashboard">Userlist</Link></li>}
                        {isAuth && <li><Link className="link-text" to="/profile">{firstName} {lastName}</Link></li>}
                        {!isAuth && <li><Link className="link-text" to="/login">Log in</Link> / <Link className="link-text" to="/register">Register</Link></li>}
                        {isAuth && <li><Link className="link-text" to="/" onClick={this.handleLogOut}>Log out</Link></li>}
                    </ul>
                    <img src={burgerIcon} className='bg_menu' onClick={() => this.setState({ showing: !showing })}/>
                </nav>
                <div>
                    { showing 
                        ? <>
                            <div className="sidebar">
                                <ul>
                                    {/* {isAuth && <li><Link className="link-text" to="/profile">Profile</Link></li>} */}
                                    {<li><Link className="link-text" to="/gardenview">garden view</Link></li>}
                                    {manager && <li><Link className="link-text" to="/dashboard">Userlist</Link></li>}
                                    {isAuth && <li><Link className="link-text" to="/profile">{firstName} {lastName}</Link></li>}
                                    {!isAuth && <li><Link className="link-text" to="/login">Log in</Link> / <Link className="link-text" to="/register">Register</Link></li>}
                                    {isAuth && <li><Link className="link-text" to="/" onClick={this.handleLogOut}>Log out</Link></li>}
                                </ul>
                            </div>
                            </>
                        : null
                    }
                </div>  
            </header>
        )
    };
}

export default Header;