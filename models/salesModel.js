const connection = require('../db');

async function getAllSales() {
  const query = `SELECT sl.quantity, s.date, sl.sale_id, sl.product_id
  FROM StoreManager.sales_products AS sl
  INNER JOIN sales AS s
  ON s.id = sl.sale_id`;

  const [result] = await connection.execute(query);

  return result;
}

async function getSaleById(id) {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
}

async function getSalesProduct(id) {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
}

async function postSales(date) {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';

  const [result] = await connection.execute(query, [date]);

  return result;
}

async function postSalesProduct(productId, saleId, quantity) {
  const query = `INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) 
  VALUES (?, ?, ?)`;

  const [result] = await connection.execute(query, [productId, saleId, quantity]);

  return result;
}

async function updateSalesProduct(saleId, productId, quantity) {
  const query = 'UPDATE StoreManager.sales_product product_id=? quantity=? WHERE sale_id=?';

  const [result] = await connection.execute(query, [productId, quantity, saleId]);

  return result;
}

module.exports = {
  getAllSales,
  getSaleById,
  getSalesProduct,
  postSales,
  postSalesProduct,
  updateSalesProduct,
};