import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/analysis" className="navbar-link">Analysis</Link>
        </li>
        <li className="navbar-item">
          <Link to="/aware" className="navbar-link">Awareness Portal</Link>
        </li>
      </ul>
    </nav>
  );
}



export default Navbar;














