const salesModel = require('../models/salesModel');

async function getSales(id = null) {
  if (id) {
    const sale = await salesModel.getById(id);

    if (sale.length === 0) {
      throw new Error('Sale not found');
    }

    return sale[0];
  }

  const sales = await salesModel.getAll();

  return sales;
}

module.exports = {
  getSales,
};