const express = require('express');

const router = express.Router();

const productController = require('../controllers/productsController');

const {
  validateProductName,
  validateProductQuantity,
} = require('../middlewares');

router.get('/', productController.getProducts);
router.get('/:id', productController.getById);
router.post('/', validateProductName, validateProductQuantity, productController.postProduct);
router.put('/:id', validateProductName, validateProductQuantity, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
