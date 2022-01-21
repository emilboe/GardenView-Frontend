// ----- React and plugins ----- 
import React, { Component } from 'react';
import { HashRouter  as Router, Switch, Route, Redirect } from "react-router-dom";
import moment from 'moment';

// ----- API and user Data ----- 
import { fetchPlants } from './api/plants';
import { getUser } from './actions/storage';

// ----- Components ----- 
import Login from './components/Login/login';
import ForgotPW from './components/forgotPW/forgotPW';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Header from './components/Header/Header';
import PrivateRoute from './routes/PrivateRoute';
import ManagerRoute from './routes/ManagerRoute';
import Profile from './components/Profile/Profile';
import AddPlant from './components/AddPlant/AddPlant';
import withUsersFetch from './components/hoc/UsersHoc';
import Dashboard from './components/Dashboard/Dashboard';
import GardenView from './components/GardenView/GardenView';
import LandingPage from './components/LandingPage/LandingPage';
import PopupData from './components/PopupData/PopupData';
import Popup from './components/Popup/Popup';
import { AuthConsumer } from './actions/Auth';

import './App.css';

const INITIAL_STATE = { firstName: '', lastName: '', role: '', }

class App extends Component {
    constructor(props) {
        super(props);
        this.state = getUser() || INITIAL_STATE;
        this.getPlants()
    }

    handleLoginSuccess = () => {
        this.setState(getUser())
    }

    handleLogoutSuccess = () => {
        this.setState(INITIAL_STATE)
    }

    async getPlants() {
        const res = await fetchPlants();
        if (res.error) {
            this.setState({ error: res.error });
        }
        else {
            console.log(res.data)
            this.setState({ plants: res.data, error: '' });
        }
    }
    sortByWatering = (plantArray) => {
        if (!plantArray) return

        const daysUntilYo = (plant) => {
            var a = moment();
            var b = moment(plant.last_watering_date);
            var differnce = a.diff(b, 'days', true);
            return (Math.floor(plant.schedule - differnce));
        }

        plantArray.sort((a, b) => {
            var aSched = daysUntilYo(a)
            var bSched = daysUntilYo(b)

            if (aSched < bSched) return -1
            else return 1
        })

        return plantArray

    }

    render() {
        const DashboardWithFetch = withUsersFetch(Dashboard);
        if (this.state.plants) {
            this.sortByWatering(this.state.plants)
        }
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
