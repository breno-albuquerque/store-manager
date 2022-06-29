import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation';
import { getProducts, postSale } from '../services/requests';
import theme from '../Theme';

const Container = styled.div`
  margin: 0 auto;
  max-width: 992px;
  font-family: ${(p) => p.theme.font};
`;

function Sales() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [prodToSale, setProdToSale] = useState([]);
  const [sale, setSale] = useState([]);

  const setToSale = (data) => {
    const toSale = data.map((item) => ({ id: item.id, quantity: '' }));
    setProdToSale(toSale);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setToSale(data);
    };

    fetchProducts();
  }, []);

  const handleIncludeClick = (target, id) => {
    const commit = prodToSale.find((item) => (
      parseInt(item.id, 10) === parseInt(id, 10)
    ));

    if (commit.quantity === '') commit.quantity = 0;

    setProdToSale((prev) => (
      prev.map((item) => {
        if (parseInt(item.id, 10) === parseInt(id, 10)) {
          return {
            id: item.id,
            quantity: '',
          };
        }
        return item;
      })
    ));
    setSale((prev) => ([...prev, commit]));
  };

  const handleDisableBtn = (id) => {
    const isDisabled = sale.some((item) => (
      parseInt(item.id, 10) === parseInt(id, 10)
    ));

    return isDisabled;
  };

  const handleQuantityChange = ({ target }) => {
    const update = prodToSale.map((item) => {
      if (parseInt(item.id, 10) === parseInt(target.name, 10)) {
        return {
          id: item.id,
          quantity: target.value,
        };
      }
      return item;
    });

    setProdToSale(update);
  };

  const handleAddClick = async () => {
    const saleToAdd = sale.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const data = await postSale(saleToAdd);

    if (data.code === 'ERR_BAD_REQUEST') {
      toast(data.response.data.message);
      setToSale(products);
      setSale([]);
      return;
    }

    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation location="sales" />
      <Container>

        <Toaster />

        <h2>Add Sale</h2>

        { products && products.map((product) => {
          const { id, name } = product;
          return (

            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Product</Form.Label>
              {`${id} - ${name}`}
              <input
                name={id}
                placeholder="Quantity"
                onChange={handleQuantityChange}
                value={
                  prodToSale.find((e) => parseInt(e.id, 10) === parseInt(id, 10)).quantity
                }
                id={`quantity-${id}`}
                type="number"
              />

              <Button
                type="button"
                onClick={({ target }) => handleIncludeClick(target, id)}
                disabled={handleDisableBtn(id)}
              >
                Include
              </Button>
            </Form.Group>
          );
        }) }

        <Button
          type="button"
          onClick={handleAddClick}
        >
          Add Sale
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default Sales;
