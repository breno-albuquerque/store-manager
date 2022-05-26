const connection = require('../db');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.products';

  const [result] = await connection.execute(query);

  return result;
}

async function getById(id) {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  return product;
}

async function postProduct(name, quantity) {
  const query = 'INSERT INTO StoreManaget.products (name, quantity) VALUES (?, ?)';

  const [result] = await connection.execute(query, [name, quantity]);

  return result;
} 

module.exports = {
  getAll,
  getById,
  postProduct,
};