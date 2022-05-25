const productsModel = require('../models/productsModel');

async function getProducts(id = null) {
  if (id) {
    const product = await productsModel.getById(id);
    return product;
  }
  
  const products = await productsModel.getAll();
  return products;
}

module.exports = {
  getProducts,
};