const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.get('/', salesController.getSales);
router.get('/:id', salesController.getById);
router.post('/', salesController.postSale);

module.exports = router;