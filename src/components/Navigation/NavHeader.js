import React, { useState, useEffect, useContext } from 'react';
import './Nav.scss';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../../logo.png';

import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
    const location = useLocation();
    const history = useHistory();

    const { user, logoutContext } = useContext(UserContext);

    //Handle logout
    const handleLogout = async () => {
        let response = await logoutUser(); //Clear cookie
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            localStorage.removeItem("jwt"); //clear local storage
            logoutContext(); //clear user context
            history.push('/login');
        } else {
            toast.error(response.EM);
        }
    }
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
                                    <NavLink to="/roles" className='nav-link'>Roles</NavLink>
                                </Nav>
                                {
                                    user && user.isAuthenticated === true ?
                                        <Nav>
                                            <Nav.Item className='nav-link'>Hello {user.account.username}</Nav.Item>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item>Change password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogout()}>Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                        :
                                        <Nav>
                                            <Link className="nav-link" to='/login'>Login</Link>
                                        </Nav>
                                }

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