import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container, Nav, Navbar,
} from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();

  const handleRedirect = (event, endpoint) => {
    event.preventDefault();
    navigate(endpoint);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand
          href="#home"
        >
          Navbar
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
        >
          <Nav
            className="me-auto"
          >
            <Nav.Link
              type="button"
              onClick={(event) => handleRedirect(event, '/')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              type="button"
              onClick={(event) => handleRedirect(event, '/products')}
            >
              Products
            </Nav.Link>
            <Nav.Link
              type="button"
              onClick={(event) => handleRedirect(event, '/sales')}
            >
              Sales
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
