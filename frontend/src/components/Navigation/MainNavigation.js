import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNavigation(props) {
  return (
    <header>
      <div className='main_navigation__logo'>
        <h1>EasyEvent</h1>
      </div>
      <nav className='main_navigation__item'>
        <ul>
          <li>
            <NavLink to='/auth'>Authenticate</NavLink>
          </li>
          <li>
            <NavLink to='/events'>Events</NavLink>
          </li>
          <li>
            <NavLink to='/bookings'>Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
