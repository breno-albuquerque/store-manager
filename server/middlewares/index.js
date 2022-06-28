const errorMiddleware = require('./errorMiddleware');
const validateProductName = require('./validateProductName');
const validateProductQuantity = require('./validateProductQuantity');
const validateSaleProductId = require('./validateSaleProductId');
const validateSaleQuantity = require('./validateSaleQuantity');

module.exports = {
  errorMiddleware,
  validateProductName,
  validateProductQuantity,
  validateSaleProductId,
  validateSaleQuantity,
};