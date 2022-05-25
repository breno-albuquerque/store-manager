const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello');
});

router.get('/:id', (req, res) => {

});

module.exports = router;