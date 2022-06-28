import React, { useEffect, useState } from 'react';

import { getProducts } from '../services/requests';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <table>
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
      </table>

    </main>
  );
}

export default Home;
