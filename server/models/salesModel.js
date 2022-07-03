const connection = require('../db');

const getAllSales = async () => {
  const query = `
  SELECT sl.quantity, s.date, sl.saleId, sl.productId, p.name
  FROM StoreManager.salesProducts AS sl
  INNER JOIN sales AS s
  ON s.id = sl.saleId
  INNER JOIN products AS p
  ON p.id = sl.productId
  `;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const getSalesProduct = async (id) => {
  const query = 'SELECT * FROM StoreManager.salesProducts WHERE saleId = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const postSales = async (date) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const [result] = await connection.execute(query, [date]);
  return result;
};

const postSalesProduct = async (productId, saleId, quantity) => {
  const query = `INSERT INTO StoreManager.salesProducts (productId, saleId, quantity) 
  VALUES (?, ?, ?)`;
  const [result] = await connection.execute(query, [productId, saleId, quantity]);
  return result;
};

const updateSalesProduct = async (saleId, productId, quantity) => {
  const query = `UPDATE StoreManager.salesProducts SET productId=?, quantity=?
  WHERE saleId=? AND productId=?`;
  const [result] = await connection.execute(query, [productId, quantity, saleId, productId]);

  return result;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const deleteSalesProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.salesProducts WHERE saleId = ?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  getSalesProduct,
  postSales,
  postSalesProduct,
  updateSalesProduct,
  deleteSale,
  deleteSalesProduct,
};
