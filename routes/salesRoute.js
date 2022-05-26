const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.use('/', salesController);

module.exports = router;