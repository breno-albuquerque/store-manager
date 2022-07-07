import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Form } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation';
import { getProducts, postProduct, updateProduct } from '../services/requests';
import theme from '../Theme';
import Load from '../components/Load';

const Container = styled.div`
  margin: 0 auto;
  max-width: 992px;
  font-family: ${(p) => p.theme.font};

  @media (max-width: 992px) {
    padding: 16px;
  }
`;

const Title = styled.h2`
  font-weight: 900;
  color: ${(p) => p.theme.back};
  font-size: 32px;
  text-align: center;
  margin-bottom: 32px;
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.light};

  color: ${(props) => props.theme.back};
  font-weight: 900;
  font-size: 16px;

  margin: 16px auto 48px auto;

  height: 24px;
  width: 40%;
  transition: all 0.3s;

  height: 32px;
  font-size: 20px;

  &:hover {
      transform: scale(1.05);
    }
  cursor: pointer;
`;

function Products() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState({
    name: '',
    quantity: '',
  });

  const [selectedEdit, setSelectedEdit] = useState('');
  const [editedProduct, setEditedProduct] = useState({
    id: '',
    name: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setEditedProduct({
        id: data[0].id,
        name: '',
        quantity: '',
      });
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
      const { id } = products.find((product) => product.name === value);
      setSelectedEdit(value);
      setEditedProduct((prev) => ({
        ...prev,
        id: parseInt(id, 10),
      }));

      return;
    }

    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = async () => {
    setIsLoading(true);
    const data = await postProduct(addProduct);

    if (data.code === 'ERR_BAD_REQUEST') {
      setIsLoading(false);
      return toast(data.response.data.message);
    }

    setIsLoading(false);
    return navigate('/');
  };

  const handleEditClick = async () => {
    setIsLoading(true);
    const data = await updateProduct(editedProduct);

    if (data.code === 'ERR_BAD_REQUEST') {
      setIsLoading(false);
      return toast(data.response.data.message);
    }

    setIsLoading(false);
    return navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>

      <Navigation location="products" />
      <Container>
        <Toaster />

        { isLoading && <Load /> }

        { !isLoading && (
        <Form className="d-flex flex-column">
          <Title>Add product</Title>
          <Form.Group
            className="mb-3"
          >
            <Form.Label className="text-light">Product Name</Form.Label>
            <Form.Control
              autoComplete="off"
              placeholder="Name"
              name="name"
              onChange={handleAddChange}
              value={addProduct.name}
              type="text"
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
          >
            <Form.Label className="text-light">Product Quantity</Form.Label>
            <Form.Control
              autoComplete="off"
              placeholder="Quantity"
              name="quantity"
              onChange={handleAddChange}
              value={addProduct.quantity}
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
        )}

        {!isLoading
        && (
        <Form className="d-flex flex-column">
          <Title>Edit product</Title>

          <Form.Group
            className="mb-3"
          >
            <Form.Label className="text-light">Product</Form.Label>
            <Form.Select
              onChange={handleEditChange}
              name="id"
              value={selectedEdit}
              id="product-id"
            >
              { products.length > 0 && products.map((product) => (
                <option key={product.id}>
                  {product.name}
                </option>
              )) }
            </Form.Select>
          </Form.Group>

          <Form.Group
            className="mb-3"
          >
            <Form.Label className="text-light">New Name</Form.Label>
            <Form.Control
              autoComplete="off"
              onChange={handleEditChange}
              placeholder="New Name"
              name="name"
              value={editedProduct.name}
              type="text"
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
          >
            <Form.Label className="text-light">New Quantity</Form.Label>
            <Form.Control
              autoComplete="off"
              onChange={handleEditChange}
              placeholder="New Quantity"
              value={editedProduct.quantity}
              name="quantity"
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
        )}

      </Container>
    </ThemeProvider>
  );
}

export default Products;
