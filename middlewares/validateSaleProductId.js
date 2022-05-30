const MyError = require('../helpers/MyError');

function validateSaleProductId(req, _res, next) {
  req.body.forEach((item) => {
    const { productId } = item;

    if (productId === undefined) {
      throw new MyError('"productId" is required', 400);
    }
  });

  next();
}

module.exports = validateSaleProductId;