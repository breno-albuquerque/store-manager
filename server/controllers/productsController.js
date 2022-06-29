const productsService = require('../services/productsService');

const getProducts = async (req, res, next) => {
  try {
    const products = await productsService.getProducts();
    console.log(products)
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProducts(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  try {
    const newProduct = await productsService.postProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.updateProduct(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getById,
  postProduct,
  updateProduct,
  deleteProduct,
};
