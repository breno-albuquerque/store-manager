const salesModel = require('../models/salesModel');

async function getSales() {
  const sales = await salesModel.getAll();

  return sales;
}

module.exports = {
  getSales,
};