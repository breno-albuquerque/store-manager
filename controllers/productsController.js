const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await productsService.getAll();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

/* router.get('/:id', (req, res) => {

}); */

module.exports = router;