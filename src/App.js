import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { AuthConsumer } from './helpers/Auth';
import './App.css';
import Login from './components/login';

// Components import
// import Test from './components/Test';
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
    backToGarden = () => {
        console.log('go bakc pls')
    }
    upDoot = () => {
        this.forceUpdate()
        console.log('updooted')
    }
    async getPlants() {
        const res = await fetchPlants();
        console.log('Plants have been fetched', res.data);
        if (res.error) {
            this.setState({ error: res.error });
        }
        else {

            this.setState({ plants: res.data, isFetching: false, error: null });

            // var bestPlant
            // res.data.map(item => {
            //     if (item._id === this.props.match.params.id) bestPlant = item
            // })
            // console.log('bestplant', bestPlant)
            // console.log('state of the app', this.state)

            // this.handleSortChange('Time until next watering')
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
                                    <LandingPage />
                                </Route>
                                <Route path='/login'>
                                    <Login onLoginSuccess={this.handleLoginSuccess} />
                                </Route>
                                <Route path='/register'>
                                    <RegisterForm />
                                </Route>
                                <Route exact path='/gardenview'>
                                    <GardenView isAuth={isAuth} user={this.state} />
                                </Route>
                                <Route exact path="/gardenview"
                                    render={(props) => (
                                        <GardenView isAuth={isAuth} user={this.state} {...props} />
                                    )} />
                                <Route path="/gardenview/:id"
                                    render={(props) => (
                                        <>
                                            <GardenView isAuth={isAuth} user={this.state} />
                                            <Popup
                                                content={<PopupData {...props} upDoot={this.upDoot} plants={this.state.plants} goBack={this.backToGarden} />}
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
