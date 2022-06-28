import React from 'react';

function Sales() {
  return (
    <form>
      <h2>Add Sale</h2>

      <label
        htmlFor="product-id"
      >
        <input
          placeholder="Products Sold"
          id="product-id"
          type="number"
        />
      </label>

      <label
        htmlFor="product-id"
      >
        <input
          placeholder="Product Id"
          id="product-id"
          type="text"
        />
      </label>

      <label
        htmlFor="product-quantity"
      >
        <input

          name="quantity"
          placeholder="Quantity"
          id="product-quantity"
          type="text"
        />
      </label>

      <button
        type="button"
      >
        Add
      </button>
    </form>
  );
}

export default Sales;
