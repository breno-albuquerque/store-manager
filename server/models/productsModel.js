const connection = require('../db');
require('dotenv').config();

const getAll = async () => {
  const query = `SELECT * FROM ${process.env.MYSQL_DATABASE}.products`;
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT * FROM ${process.env.MYSQL_DATABASE}.products WHERE id = ?`;
  const [product] = await connection.execute(query, [id]);
  return product;
};

const postProduct = async (name, quantity) => {
  const query = `INSERT INTO ${process.env.MYSQL_DATABASE}.products (name, quantity) VALUES (?, ?)`;
  const [result] = await connection.execute(query, [name, quantity]);
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const query = `UPDATE ${process.env.MYSQL_DATABASE}.products SET name=?, quantity=? WHERE id=?`;
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = `DELETE ${process.env.MYSQL_DATABASE}.FROM products WHERE id = ?`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
  postProduct,
  updateProduct,
  deleteProduct,
};
