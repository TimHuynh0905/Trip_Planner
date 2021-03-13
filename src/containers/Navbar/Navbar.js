import React from 'react';
import { Nav } from 'react-bootstrap';
import './Navbar.scss';

const navbar = () => {
    return (
        <div id='navbar'>
            <Nav justify variant="tabs" defaultActiveKey="#home">
                <Nav.Item>
                    <Nav.Link href="#home">Browse</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#profile">About Me</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link href="#register">Register</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#signin">Sign In</Nav.Link>
                </Nav.Item> */}
            </Nav>
        </div>
    );
}

export default navbar;