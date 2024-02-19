import React, { useState, useEffect, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const Nav = (props) => {
    const location = useLocation();

    const { user } = useContext(UserContext);


    //Show navigation when user is logged in or the pathname is "/"
    if (user && user.isAuthenticated === true || location.pathname === "/") {

        return (
            <>
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/Projects">Project</NavLink>
                    {/* <NavLink to="/login">Login</NavLink> */}
                </div>

            </>
        );
    } else {
        return (
            <>
            </>
        )
    }
}

export default Nav;