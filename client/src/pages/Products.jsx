import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getProducts, postProduct, updateProduct } from '../services/requests';

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState({
    name: '',
    quantity: '',
  });

  const [selectedEdit, setSelectedEdit] = useState('');
  const [editedProduct, setEditedProduct] = useState({
    id: 1,
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

    if (name === 'id') {
      setSelectedEdit(value);
      setEditedProduct((prev) => ({
        ...prev,
        id: parseInt(value[0], 10),
      }));

      return;
    }

    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = async () => {
    const data = await postProduct(addProduct);
    navigate('/');
  };

  const handleEditClick = async () => {
    const data = await updateProduct(editedProduct);
    navigate('/');
  };

  return (
    <div>
      <Header />

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

        <button
          onClick={handleAddClick}
          type="button"
        >
          Add
        </button>
      </form>

      <form>
        <h2>Edit product</h2>

        <label
          htmlFor="product-operation"
        >
          <select
            onChange={handleEditChange}
            name="id"
            value={selectedEdit}
            id="product-id"
          >
            { products.length > 0 && products.map((product) => (
              <option key={product.id}>
                {`${product.id} - ${product.name}`}
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
            value={editedProduct.name}
            type="text"
          />
        </label>

        <label
          htmlFor="product-quantity"
        >
          <input
            onChange={handleEditChange}
            placeholder="New Quantity"
            value={editedProduct.quantity}
            name="quantity"
            id="product-quantity"
            type="number"
          />
        </label>

        <button
          type="button"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </form>
    </div>
  );
}

export default Products;
