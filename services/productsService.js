const productsModel = require('../models/productsModel');

async function getProducts(id = null) {
  if (id) {
    const productArr = await productsModel.getById(id);
    return productArr[0];
  }
  
  const products = await productsModel.getAll();
  return products;
}

module.exports = {
  getProducts,
};