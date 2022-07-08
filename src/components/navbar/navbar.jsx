import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export const NavBar = (props) => {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    const isAuth = () => {
        if (typeof window === "undefined") {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token')
        } else {
            return false;
        }
    }
    return (

        <Navbar className="main-nav" variant="dark" sticky="top" expand="lg">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">myFlixCinema</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ml-auto'>
                        {isAuth() && (
                            <Button variant="link"><Nav.Link href='/'>Home</Nav.Link></Button>
                        )}
                        {isAuth() && (
                            <Button variant="link"><Nav.Link href={`/users/${props.user}`}>{props.user}</Nav.Link></Button>
                        )}
                        {/* {isAuth() && (
                            <Button variant="link"><Nav.Link href={`/users/${props.user}`}>Profile</Nav.Link></Button>
                        )} */}
                        {isAuth() && (
                            <Button variant="link" className="navbar-logout" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Button variant="link"><Nav.Link href='/'>Sign-in</Nav.Link></Button>
                        )}
                        {!isAuth() && (
                            <Button variant="link"><Nav.Link href="/register">Sign-up</Nav.Link></Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}