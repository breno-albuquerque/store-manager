import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Header from '../components/Header';

import { getProducts, getSales } from '../services/requests';

function Home() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    const fetchSales = async () => {
      const data = await getSales();
      setSales(data);
    };

    fetchSales();
    fetchProducts();
  }, []);

  return (
    <main>
      <Header location="home" />

      <Table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          { products.length > 0 && products.map((product) => {
            const { id, name, quantity } = product;
            return (
              <tr key={id}>
                <td>{ id }</td>
                <td>{ name }</td>
                <td>{ quantity }</td>
              </tr>
            );
          }) }
        </tbody>
      </Table>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Id</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          { sales.length > 0 && sales.map((sale) => {
            const { saleId, productId, quantity } = sale;
            return (
              <tr key={saleId}>
                <td>{ saleId }</td>
                <td>{ productId }</td>
                <td>{ quantity }</td>
              </tr>
            );
          }) }
        </tbody>
      </Table>
    </main>
  );
}

export default Home;
