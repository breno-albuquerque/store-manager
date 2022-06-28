const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

const { validateSaleQuantity, validateSaleProductId } = require('../middlewares');

router.get('/', salesController.getSales);
router.get('/:id', salesController.getById);
router.post('/', validateSaleProductId, validateSaleQuantity, salesController.postSale);
router.put('/:id', validateSaleProductId, validateSaleQuantity, salesController.updateSalesProduct);
router.delete('/:id', salesController.deleteSalesProduct);

module.exports = router;