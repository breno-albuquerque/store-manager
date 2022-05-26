const connection = require('../db');

async function getAll() {
  const query = `SELECT sl.quantity, s.date, sl.sale_id, sl.product_id
  FROM StoreManager.sales_products AS sl
  INNER JOIN sales AS s
  ON s.id = sl.sale_id`;

  const [result] = await connection.execute(query);

  return result;
}

async function getById(id) {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
}

async function getSalesProduct(id) {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
}

module.exports = {
  getAll,
  getById,
  getSalesProduct,
};