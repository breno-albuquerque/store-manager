import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from '../components/Navigation';
import theme from '../Theme';

import { deleteSale, getProducts, getSales } from '../services/requests';

const Title = styled.h2`
  font-size: 36px;
  text-align: center;
  color: ${(p) => p.theme.back};
  margin-bottom: 32px;
  font-weight: 900;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 992px;
  font-family: ${(p) => p.theme.font};
`;

const Table = styled.table`
  box-sizing: border-box;
  margin: 0 auto;

  color: ${(p) => p.theme.alt};

  background-color: ${(p) => p.theme.back};
  border-radius: 5px;
  box-shadow: 0px 0px 17px 5px ${(p) => `${p.theme.back}10`};

  width: 80%;

  text-align: center;
  border-collapse: collapse;

  margin-bottom: 32px;

  &:nth-child(n) {
    text-align: center;
  }

  @media(min-width: 992px) {
    margin-bottom: 56px;
    font-size: 20px;
  }
`;

const Th = styled.th`
  border-bottom: 1px solid ${(props) => props.theme.alt};
  padding: 8px;

  @media(min-width: 992px) {
    padding: 12px;
  }
`;

const Td = styled.td`
  padding: 8px;
  color: ${(props) => props.theme.alt};
  font-family: ${(props) => props.delete && 'Material Icons'};
  border-top: ${(props) => props.sale && '1px solid black'};
  vertical-align: middle;

  @media(min-width: 992px) {
    padding: 12px;

    &:hover {
      cursor: ${(props) => props.delete && 'pointer'};
      transform: ${(props) => props.delete && 'scale(1.1)'};
      color: ${(props) => props.delete && props.theme.light};
    }
  }
`;

const IdTd = styled.td`
  border-collapse: collapse;
  background-color: ${(props) => props.theme.light};
  width: 36px;
  border-top: ${(props) => props.sale && '1px solid black'};
  vertical-align: middle;

  @media(min-width: 992px) {
    width: 44px;
  }
`;

const IdTh = styled.th`
  background-color: ${(props) => props.theme.light};
  border-bottom: 1px solid ${(props) => props.theme.alt};
  border-top-left-radius: 5px;

  @media(min-width: 992px) {
    padding: 12px;
  }
`;

function Home() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getSales();

      if (data.code !== 'ERR_NETWORK') {
        setSales(data);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      if (data.code !== 'ERR_NETWORK') {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [sales]);

  async function handleDelete(id) {
    await deleteSale(id);
    const data = await getSales();
    setSales(data);
  }

  const salesId = sales.map((sale) => sale.saleId);
  let uniqueIds = [...new Set(salesId)];

  const isFirst = (saleId) => {
    if (uniqueIds.some((id) => id === saleId)) {
      uniqueIds = uniqueIds.filter((id) => id !== saleId);
      return true;
    }
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation location="home" />
      <Container>

        <Title>Product Stock</Title>

        <Table>
          <thead>
            <tr>
              <IdTh>Id</IdTh>
              <Th>Name</Th>
              <Th>Quantity</Th>
            </tr>
          </thead>
          <tbody>
            { products.length > 0 && products.map((product, index) => {
              const { id, name, quantity } = product;
              if (index === products.length - 1) {
                return (
                  <tr key={id}>
                    <IdTd>{ id }</IdTd>
                    <Td>{ name }</Td>
                    <Td>{ quantity }</Td>
                  </tr>
                );
              }
              return (
                <tr key={id}>
                  <IdTd>{ id }</IdTd>
                  <Td>{ name }</Td>
                  <Td>{ quantity }</Td>
                </tr>
              );
            }) }
          </tbody>
        </Table>

        <Title>Sales Logs</Title>

        <Table>
          <thead>
            <tr>
              <IdTh>Sale</IdTh>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Del</Th>
            </tr>
          </thead>
          <tbody>
            { sales && sales.map((sale) => {
              const {
                saleId, quantity, productName, productId,
              } = sale;

              const rowSpan = sales.reduce((acc, curr) => {
                if (saleId === curr.saleId) {
                  return acc + 1;
                }
                return acc;
              }, 0);

              const key = `${saleId}${productId}`;
              const isFirstReturn = isFirst(saleId);

              if (isFirstReturn) {
                return (
                  <tr key={key}>
                    <IdTd
                      sale
                      rowSpan={rowSpan}
                    >
                      { sale.saleId }
                    </IdTd>
                    <Td sale>{ productName }</Td>
                    <Td sale>{ quantity }</Td>
                    <Td
                      sale
                      rowSpan={rowSpan}
                      delete
                      onClick={() => handleDelete(saleId)}
                    >
                      delete
                    </Td>
                  </tr>
                );
              }
              return (
                <tr key={key}>
                  <Td>{ productName }</Td>
                  <Td>{ quantity }</Td>
                </tr>
              );
            }) }
          </tbody>
        </Table>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
