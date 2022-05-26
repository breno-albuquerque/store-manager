const errorMiddleware = require('./errorMiddleware');
const validateProductName = require('./validateProductName');
const validateProductQuantity = require('./validateProductQuantity');

module.exports = {
  errorMiddleware,
  validateProductName,
  validateProductQuantity,
};