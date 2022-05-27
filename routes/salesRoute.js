const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

const { validateSaleQuantity } = require('../middlewares');

router.get('/', salesController.getSales);
router.get('/:id', salesController.getById);
router.post('/', salesController.postSale);
router.put('/:id', validateSaleQuantity, salesController.updateSalesProduct);

module.exports = router;