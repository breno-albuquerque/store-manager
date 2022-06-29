import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Form } from 'react-bootstrap';
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

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    navigate('/');
  };

  const handleEditClick = async () => {
    const data = await updateProduct(editedProduct);

    if (data.code === 'ERR_BAD_REQUEST') {
      return toast(data.response.data.message);
    }

    navigate('/');
  };

  return (
    <div>
      <Header location="products" />

      <Toaster />

      <Form>
        <h2>Add product</h2>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            placeholder="Name"
            name="name"
            onChange={handleAddChange}
            value={addProduct.name}
            id="product-name"
            type="text"
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            placeholder="Quantity"
            name="quantity"
            onChange={handleAddChange}
            value={addProduct.quantity}
            id="product-quantity"
            type="number"
          />
        </Form.Group>

        <Button
          onClick={handleAddClick}
          type="button"
        >
          Add
        </Button>
      </Form>

      <Form>
        <h2>Edit product</h2>

        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Product</Form.Label>
          <Form.Select
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
          </Form.Select>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>New Name</Form.Label>
          <Form.Control
            onChange={handleEditChange}
            placeholder="New Name"
            name="name"
            id="product-name"
            value={editedProduct.name}
            type="text"
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>New Quantity</Form.Label>
          <Form.Control
            onChange={handleEditChange}
            placeholder="New Quantity"
            value={editedProduct.quantity}
            name="quantity"
            id="product-quantity"
            type="number"
          />
        </Form.Group>

        <Button
          type="button"
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default Products;
