import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className='main_navigation'>
          <div className='main_navigation__logo'>
            <h1>EasyEvent</h1>
          </div>
          <nav className='main_navigation__items'>
            <ul>
              {!context.token && (
                <li>
                  <NavLink to='/auth'>Authenticate</NavLink>
                </li>
              )}
              <li>
                <NavLink to='/events'>Events</NavLink>
              </li>
              {context.token && (
                <>
                  <li>
                    <NavLink to='/bookings'>Bookings</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
