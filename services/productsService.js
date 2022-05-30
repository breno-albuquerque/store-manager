const productsModel = require('../models/productsModel');
const MyError = require('../helpers/MyError');

const getProducts = async (id = null) => {
  if (id) {
    const productArr = await productsModel.getById(id);

    if (productArr.length === 0) {
      throw new MyError('Product not found', 404);
    }

    return productArr[0];
  }
  
  const products = await productsModel.getAll();
  return products;
};

const postProduct = async ({ name, quantity }) => {
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
};

const updateProduct = async (id, { name, quantity }) => {
  const products = await getProducts();

  const doesntExists = products.every((product) => product.id !== parseInt(id, 10));

  if (doesntExists) {
    throw new MyError('Product not found', 404);
  }

  await productsModel.updateProduct(id, name, quantity);

  return {
    id,
    name,
    quantity,
  };
};

const updateProductBySale = async (productId, quantity, add = false) => {
  const product = await getProducts(productId);

  if (add) product.quantity += quantity;
  else product.quantity -= quantity;

  await productsModel.updateProduct(productId, product.name, product.quantity);
};

async function deleteProduct(id) {
  const result = await productsModel.deleteProduct(id);

  if (result.affectedRows === 0) {
    throw new MyError('Product not found', 404);
  }

  return result;
}

module.exports = {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  updateProductBySale,
};