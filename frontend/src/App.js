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

  logout = () => {};

  render() {
    return (
      <BrowserRouter>
        <>
          <AuthContext
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
                <Redirect from='/' to='/auth' exact />
                <Route path='/auth' component={AuthPage} />
                <Route path='/events' component={EventsPage} />
                <Route path='/bookings' component={BookingsPage} />
              </Switch>
            </main>
          </AuthContext>
        </>
      </BrowserRouter>
    );
  }
}
