const express = require('express');

const router = express.Router();

const productsRoute = require('./productsRoute');
const salesRoute = require('./salesRoute');

router.use('/products', productsRoute);
router.use('/sales', salesRoute);

module.exports = router;
