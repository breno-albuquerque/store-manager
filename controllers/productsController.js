const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await productsService.getProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProducts(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;