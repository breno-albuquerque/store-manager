import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleRedirect = ({ target }) => {
    const { value } = target;
    navigate(value);
  };

  return (
    <header>
      <button
        value="/"
        type="button"
        onClick={handleRedirect}
      >
        Home
      </button>
      <button
        value="/products"
        type="button"
        onClick={handleRedirect}
      >
        Product
      </button>
      <button
        value="/sales"
        type="button"
        onClick={handleRedirect}
      >
        Sales
      </button>
    </header>
  );
}

export default Header;
