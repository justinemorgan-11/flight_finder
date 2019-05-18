import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/flights" className="nav-link">Flights</Link>
            <Link to="/wallet" className="nav-link">Wallet</Link>
        </nav >
    )
}

export default Nav;
