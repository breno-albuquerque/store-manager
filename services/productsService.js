const productsModel = require('../models/productsModel');
const MyError = require('../helpers/MyError');
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

async function postProduct({ name, quantity }) {
  const products = await getProducts();

  const exists = products.some((product) => product.name === name);

  if (exists) {
    throw new MyError('Product already exists', 409);
  }

  const { insertId } = await productsModel.postProduct(name, quantity);

  return {
    id: insertId,
    name,
    quantity,
  };
}

async function updateProduct(id, { name, quantity }) {
  const products = await getProducts();

  console.log('Produtos: ', products);

  const doesntExists = products.every((product) => product.id !== parseInt(id, 10));

  console.log('doesntExists', doesntExists);

  if (doesntExists) {
    throw new MyError('Product not found', 404);
  }

  await productsModel.updateProduct(id, name, quantity);

  return {
    id,
    name,
    quantity,
  };
}

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
};