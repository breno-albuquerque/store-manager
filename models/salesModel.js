const connection = require('../db');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.sales';

  const [result] = await connection.execute(query);

  return result;
}

module.exports = {
  getAll,
};