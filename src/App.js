import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { AuthConsumer } from './helpers/Auth';
import './App.css';

// Components import
// import Test from './components/Test';
import Login from './components/Login/login';
import ForgotPW from './components/forgotPW/forgotPW';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Header from './components/Header/Header';
import PrivateRoute from './routes/PrivateRoute';
import ManagerRoute from './routes/ManagerRoute';
import Profile from './components/Profile/Profile';
import AddPlant from './components/AddPlant/AddPlant';
import { getUser } from './helpers/storage';
import withUsersFetch from './components/hoc/UsersHoc';
import Dashboard from './components/Dashboard/Dashboard';
import GardenView from './components/GardenView/GardenView';
import LandingPage from './components/LandingPage/LandingPage';
import PopupData from './components/PopupData/PopupData';
import { fetchPlants } from './api/plants';
import Popup from './components/Popup/Popup';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    role: '',
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = getUser() || INITIAL_STATE;
        this.getPlants()
    }

    handleLoginSuccess = () => {
        console.log('The user is authenticated, here we can do whatever we want...');
        this.setState(getUser())
    }

    handleLogoutSuccess = () => {
        console.log('you are logged out!')
        this.setState(INITIAL_STATE)
    }

    async getPlants() {
        const res = await fetchPlants();
        console.log('Plants have been fetched', res.data);
        if (res.error) {
            this.setState({ error: res.error });
        }
        else {
            console.log(res.data)
            this.setState({ plants: res.data, isFetching: false, error: null });
        }
    }

    render() {
        const DashboardWithFetch = withUsersFetch(Dashboard);
        return (
            <AuthConsumer>
                {({ isAuth }) => (
                    <Router>
                        <Header isAuth={isAuth} user={this.state} onLogoutSuccess={this.handleLogoutSuccess} />
                        <main>
                            <Switch>
                                <Route exact path='/'>
                                    <Redirect to='/about' />
                                </Route>
                                <Route exact path='/about'>
                                    <LandingPage />
                                </Route>
                                <Route path='/login'>
                                    <Login onLoginSuccess={this.handleLoginSuccess} />
                                </Route>
                                <Route path='/register'>
                                    <RegisterForm />
                                </Route>
                                <Route path='/forgotPW'>
                                    <ForgotPW />
                                </Route>
                                <Route exact path="/gardenview">
                                    <GardenView getPlants={this.getPlants.bind(this)} plants={this.state.plants} isAuth={isAuth} user={this.state} />
                                </Route>
                                <Route path="/gardenview/:id"
                                    render={(props) => (
                                        <>
                                            <GardenView getPlants={this.getPlants.bind(this)} plants={this.state.plants} isAuth={isAuth} user={this.state} />
                                            <Popup
                                                content={<PopupData getPlants={this.getPlants.bind(this)} {...props} plants={this.state.plants} />}
                                                redirect='/gardenview'
                                            />
                                        </>
                                    )} />
                                <Route path='/profile'>
                                    <Profile />
                                </Route>
                                <PrivateRoute>
                                    <ManagerRoute exact path="/dashboard">
                                        <DashboardWithFetch />
                                    </ManagerRoute>
                                    <ManagerRoute exact path="/addPlant">
                                        <AddPlant />
                                    </ManagerRoute>
                                </PrivateRoute>
                            </Switch>
                        </main>
                    </Router>
                )}
            </AuthConsumer>
        );
    }
}

export default App;
