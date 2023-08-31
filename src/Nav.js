import React from 'react';

import { Link } from 'react-router-dom';
import './nav.css';

const NavComponent = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">Electron V</Link>
        </div>
        <div className="nav-links">
          <Link to="/flow">Want to charge</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>

);
}

export default NavComponent;
