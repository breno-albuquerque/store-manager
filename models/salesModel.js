const connection = require('../db');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.sales';

  const [result] = await connection.execute(query);

  return result;
}

async function getById(id) {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
}

module.exports = {
  getAll,
  getById,
};