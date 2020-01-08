import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

const Header = props => (
  <header className="black mb5 pt5">
    <h1 className="tracked f3 rubik tc mt0 mb3 ttu">LosBangeles.fm</h1>
    <ul className="list flex justify-center pl0">
      <li className="mh2">
        <NavLink exact to="/" className="nav-link link rubik f6 ttu gray">
          Stream
        </NavLink>
      </li>
      <li className="mh2">
        <NavLink to="/archive" className="nav-link link rubik f6 ttu gray">
          Archive
        </NavLink>
      </li>
      <li className="mh2">
        <NavLink to="/About" className="nav-link link rubik f6 ttu gray">
          About
        </NavLink>
      </li>
    </ul>
  </header>
);

export default Header;
