const productsModel = require('../models/productsModel');
const MyError = require('../helpers/myError');
//  const middlewares = require('../middlewares');

async function getProducts(id = null) {
  if (id) {
    const productArr = await productsModel.getById(id);

    if (productArr.length === 0) {
      throw new MyError('Product not found', 404);
    }

    return productArr[0];
  }
  
  const products = await productsModel.getAll();
  return products;
}

module.exports = {
  getProducts,
};