const connection = require('../db');
require('dotenv').config();

const getAllSales = async () => {
  const query = `
  SELECT sl.quantity, s.date, sl.saleId, sl.productId, p.name
  FROM ${process.env.MYSQL_DATABASE}.salesProducts AS sl
  INNER JOIN sales AS s
  ON s.id = sl.saleId
  INNER JOIN products AS p
  ON p.id = sl.productId
  `;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
  const query = `SELECT * FROM ${process.env.MYSQL_DATABASE}.sales WHERE id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const getSalesProduct = async (id) => {
  const query = `SELECT * FROM ${process.env.MYSQL_DATABASE}.salesProducts WHERE saleId = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const postSales = async (date) => {
  const query = `INSERT INTO ${process.env.MYSQL_DATABASE}.sales (date) VALUES (?)`;
  const [result] = await connection.execute(query, [date]);
  return result;
};

const postSalesProduct = async (productId, saleId, quantity) => {
  const query = `INSERT INTO ${process.env.MYSQL_DATABASE}.salesProducts (productId, saleId, quantity) 
  VALUES (?, ?, ?)`;
  const [result] = await connection.execute(query, [productId, saleId, quantity]);
  return result;
};

const updateSalesProduct = async (saleId, productId, quantity) => {
  const query = `UPDATE ${process.env.MYSQL_DATABASE}.salesProducts SET productId=?, quantity=?
  WHERE saleId=? AND productId=?`;
  const [result] = await connection.execute(query, [productId, quantity, saleId, productId]);

  return result;
};

const deleteSale = async (id) => {
  const query = `DELETE FROM ${process.env.MYSQL_DATABASE}.sales WHERE id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const deleteSalesProduct = async (id) => {
  const query = `DELETE FROM ${process.env.MYSQL_DATABASE}.salesProducts WHERE saleId = ?`;
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
