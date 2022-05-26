const productsService = require('../services/productsService');

const getProducts = async (req, res, next) => {
  try {
    const products = await productsService.getProducts();

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

module.exports = {
  getProducts,
  getById,
};