import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';

import AuthContext from './context/auth-context';

export default class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className='main_content'>
              <Switch>
                {!this.state.token && <Redirect from='/' to='/auth' exact />}
                {this.state.token && <Redirect from='/' to='/events' exact />}
                {this.state.token && <Redirect from='/auth' to='/events' exact />}
                {!this.state.token && <Route path='/auth' component={AuthPage} />}
                <Route path='/events' component={EventsPage} />
                {this.state.token && <Route path='/bookings' component={BookingsPage} />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </>
      </BrowserRouter>
    );
  }
}
