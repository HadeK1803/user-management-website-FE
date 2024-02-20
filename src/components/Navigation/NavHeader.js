import React, { useState, useEffect, useContext } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../../logo.png'
const NavHeader = (props) => {
    const location = useLocation();

    const { user } = useContext(UserContext);

    //Show navigation when user is logged in or the pathname is "/"
    if (user && user.isAuthenticated === true || location.pathname === "/") {
        return (
            <>
                <div className='nav-header'>
                    <Navbar bg='header' expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                // alt="React Bootstrap logo"
                                />
                                <span className='brand-name'>HadeK</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/Projects" className='nav-link'>Project</NavLink>

                                </Nav>
                                <Nav>
                                    <Nav.Item className='nav-link'>Hello Boss!</Nav.Item>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.2">
                                            Log out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
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

export default NavHeader;