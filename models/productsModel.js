const connection = require('../db');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.products';

  const [result] = connection.execute(query);

  return result;
}

module.exports = {
  getAll,
};