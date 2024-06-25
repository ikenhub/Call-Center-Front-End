import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'; // Import Bootstrap components

const NavigationBar = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleLogout = () => {
        navigate('/'); // Redirect to login page after logout
    };

    const isAuthForm = location.pathname === '/' || location.pathname === '/register';

    if (isAuthForm) return null;

    return (
        <Navbar className='mb-2' bg="light" expand="lg" sticky="top">
            <Navbar.Brand>Call Center App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/dashboard">Calls List</Nav.Link>
                    {user.role === 'supervisor' && (
                        <Nav.Link as={Link} to="/agents">Agents List</Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
