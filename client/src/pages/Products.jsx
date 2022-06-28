import React from 'react';

function Products() {
  return (
    <div>
      <form>
        <h2>Add product</h2>
        <label
          htmlFor="product-name"
        >
          <input
            placeholder="Name"
/*           onChange={}
          value={} */
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
/*           onChange={}
          value={} */
            name="quantity"
            id="product-quantity"
            type="number"
          />
        </label>

        <button type="button">Add</button>
      </form>
      <form>
        <h2>Edit product</h2>

        <label
          htmlFor="product-operation"
        >
          <select>
            { }
          </select>
        </label>

        <label
          htmlFor="product-name"
        >
          <input
            placeholder="Name"
/*           onChange={}
          value={} */
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
/*           onChange={}
          value={} */
            name="quantity"
            id="product-quantity"
            type="number"
          />
        </label>

        <button type="button">Add</button>
      </form>
    </div>
  );
}

export default Products;
