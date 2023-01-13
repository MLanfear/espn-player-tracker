import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import '../style.css'
import Auth from '../../utils/auth'

function NavBar(props) {
    const { pageSelected, setPageSelected } = props
    const [expand, updateExpanded] = useState(false);
    const [navColour, updateNavbar] = useState(false);

    function scrollHandler() {
        if (window.scrollY >= 20) {
            updateNavbar(true);
        } else {
            updateNavbar(false);
        }
    }

    window.addEventListener('scroll', scrollHandler);

    return (
        <Navbar
            expanded={expand}
            fixed="top"
            expand="md"
            className={navColour ? "sticky" : "navbar"}
        >
            <Container>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => {
                        updateExpanded(expand ? false : "expanded");
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Navbar.Brand className="fake-link" onClick={() => setPageSelected('Home')}><h2>Globo Gains</h2></Navbar.Brand>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Item>
                        {Auth.loggedIn() && <li><a className={(pageSelected === 'Analysis') ? 'current-navigation-link' : "navigation-link"} href="#analysis" onClick={() => setPageSelected('Analysis')}>Community</a></li>}
                        </Nav.Item>
                        <Nav.Item>
                        {Auth.loggedIn() && <li><a className={(pageSelected === 'Players') ? 'current-navigation-link' : "navigation-link"} href="#players" onClick={() => setPageSelected('Players')}>Workouts</a></li>}
                        </Nav.Item>
                        <Nav.Item>
                        {!Auth.loggedIn() && <li><a className={(pageSelected === 'Signup') ? 'current-navigation-link' : "navigation-link"} href="#signup" onClick={() => setPageSelected('Signup')}>Signup</a></li>}
                        </Nav.Item>
                        <Nav.Item>
                        {!Auth.loggedIn() && <li><a className={(pageSelected === 'Login') ? 'current-navigation-link' : "navigation-link"} href="#login" onClick={() => setPageSelected('Login')}>Login</a></li>}
                        </Nav.Item>
                        <Nav.Item>
                        {Auth.loggedIn() && <li><a className={(pageSelected === 'Logout') ? 'current-navigation-link' : "navigation-link"} href='/' onClick={() => {
                         Auth.logout();
                        setPageSelected('Home');
                        }} > Logout </a></li>}
                        </Nav.Item>                                         
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;