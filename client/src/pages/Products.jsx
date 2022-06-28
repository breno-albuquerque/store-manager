import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState({
    name: '',
    quantity: '',
  });
  const [editProduct, setEditProduct] = useState({
    id: '',
    name: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddChange = ({ target }) => {
    const { name, value } = target;

    setAddProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = ({ target }) => {
    const { name, value } = target;

    if (value === 'Select Product') {
      setEditProduct((prev) => ({
        ...prev,
        [name]: '',
      }));

      return;
    }

    if (name === 'id') {
      const findProd = products.find((product) => product.name === value);

      setEditProduct((prev) => ({
        ...prev,
        name: findProd.name,
        id: findProd.id,
      }));

      return;
    }

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form>
        <h2>Add product</h2>
        <label
          htmlFor="product-name"
        >
          <input
            placeholder="Name"
            name="name"
            onChange={handleAddChange}
            value={addProduct.name}
            id="product-name"
            type="text"
          />
        </label>

        <label
          htmlFor="product-quantity"
        >
          <input
            placeholder="Quantity"
            name="quantity"
            onChange={handleAddChange}
            value={addProduct.quantity}
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
          <select
            onChange={handleEditChange}
            name="id"
            value={editProduct.name}
            id="product-id"
          >
            <option>Select Product</option>
            { products.length > 0 && products.map((product) => (
              <option key={product.id}>
                {' '}
                { product.name }
              </option>
            )) }
          </select>
        </label>

        <label
          htmlFor="product-name"
        >
          <input
            onChange={handleEditChange}
            placeholder="New Name"
            name="name"
            id="product-name"
            value={editProduct.name}
            type="text"
          />
        </label>

        <label
          htmlFor="product-quantity"
        >
          <input
            onChange={handleEditChange}
            placeholder="New Quantity"
            value={editProduct.quantity}
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
