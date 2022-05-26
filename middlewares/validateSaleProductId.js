const MyError = require('../helpers/MyError');

function validateSaleProductId(req, _res, next) {
  const { productId } = req.body;

  if (!productId) {
    throw new MyError('"productId" is required', 400);
  }

  next();
}

module.exports = validateSaleProductId;