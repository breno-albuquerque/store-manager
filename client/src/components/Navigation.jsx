import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Container, Nav, Navbar,
} from 'react-bootstrap';

function Navigation({ location }) {
  const navigate = useNavigate();

  const handleRedirect = (event, endpoint) => {
    event.preventDefault();
    navigate(endpoint);
  };

  return (
    <Navbar
      className="mb-5"
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
            className="p-2 fw-bold w-100 fs-2 justify-content-evenly"
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

Navigation.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Navigation;
