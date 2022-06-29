import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container, Nav, Navbar,
} from 'react-bootstrap';

function Header({ location }) {
  const navigate = useNavigate();

  const handleRedirect = (event, endpoint) => {
    event.preventDefault();
    navigate(endpoint);
  };

  return (
    <Navbar
      bg="success"
      expand="lg"
    >
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
        >
          <Nav
            className="fw-bold w-100 fs-4 justify-content-evenly"
          >
            <Nav.Link
              className={`${location === 'home' && 'text-light'}`}
              type="button"
              onClick={(event) => handleRedirect(event, '/')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={`${location === 'products' && 'text-light'}`}
              type="button"
              onClick={(event) => handleRedirect(event, '/products')}
            >
              Products
            </Nav.Link>
            <Nav.Link
              className={`${location === 'sales' && 'text-light'}`}
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
