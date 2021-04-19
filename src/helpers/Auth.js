//Code from https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638 
import React from 'react';
import { login } from '../api/users';
import { getToken, setToken, getUser, setUser, clearLocalStorage } from './storage';
const INITIAL_STATE = { isAuth: false, token: null, user: null };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const token = getToken();
    const user = getUser();

    if (token && user) {
      this.setState({ isAuth: true, token, user });
    }
  }

  login = async (userData) => {
    const { email, password } = userData;
    try {
      const response = await login(email, password);
      const { token, user } = response.data;
      this.setState({ isAuth: true, token, user }, () => {
        //callback to store token
        setToken(token)
        setUser(user);
      });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  logout = () => {
    this.setState({ ...INITIAL_STATE }, () => {
      clearLocalStorage();
    });
  };

  generateHeaders = () => {
    const response = {};
    //we read the token from memory and if it is not yet defined, we try with the stored token
    const token = this.state.token || getToken();

    if (token) {
      response.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return response;
  }

  isAuthFunc = () => {
    //if isAuth is false but localStorage has token, then, we return true.
    return this.state.isAuth || getToken() != null;
  }

  isManagerFunc = () => {
    const user = getUser()
    const manager = user.role === 'manager';
    return manager;
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          isAuthFunc: this.isAuthFunc,
          isManagerFunc: this.isManagerFunc,
          token: this.state.token,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          generateHeaders: this.generateHeaders
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };