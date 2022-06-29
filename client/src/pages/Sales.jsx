import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/requests';

function Sales() {
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

  const handleAddSale = () => {

  };

  return (
    <form>
      <h2>Add Sale</h2>

      { products && products.map((product) => {
        const { id, name } = product;
        return (
          <div key={id}>
            <label
              htmlFor={`quantity-${id}`}
            >
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
            </label>

            <button
              type="button"
              onClick={({ target }) => handleIncludeClick(target, id)}
              disabled={handleDisableBtn(id)}
            >
              Include
            </button>
          </div>
        );
      }) }

      <button
        type="button"
        onClick={handleAddSale}
      >
        Add Sale
      </button>
    </form>
  );
}

export default Sales;
