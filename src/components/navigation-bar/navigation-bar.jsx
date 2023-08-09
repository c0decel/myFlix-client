import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          movies app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  log in
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  sign up
                </Nav.Link>
              </>
            )}

            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>log out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
