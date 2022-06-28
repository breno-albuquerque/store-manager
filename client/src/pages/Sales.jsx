import React from 'react';

function Sales() {
  return (
    <form>
      <label
        htmlFor="product-id"
      >
        <input
/*           onChange={}
          name="productId"
          value={} */
          placeholder="Product Id"
          id="product-id"
          type="text"
        />
      </label>

      <label
        htmlFor="product-quantity"
      >
        <input
/*           onChange={}
          value={} */
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
