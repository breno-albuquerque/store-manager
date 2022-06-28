import React from 'react';

function Products() {
  return (
    <form>
      <label
        htmlFor="product-name"
      >
        <input
          placeholder="Name"
          onChange={}
          value={}
          name="name"
          id="product-name"
          type="text"
        />
      </label>

      <label
        htmlFor="product-quantity"
      >
        <input
          placeholder="Quantity"
          onChange={}
          value={}
          name="quantity"
          id="product-quantity"
          type="number"
        />
      </label>

      <button onClick={handleAddClick} type="button">Add</button>
    </form>
  );
}

export default Products;
