const productsModel = require('../models/productsModel');
//  const middlewares = require('../middlewares');

async function getProducts(id = null) {
  if (id) {
    const productArr = await productsModel.getById(id);

    if (productArr.length === 0) {
      throw new Error('Product not found');
    }

    return productArr[0];
  }
  
  const products = await productsModel.getAll();
  return products;
}

module.exports = {
  getProducts,
};