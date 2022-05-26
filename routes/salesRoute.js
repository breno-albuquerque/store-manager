const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.use('/', salesController.getSales);

module.exports = router;