const MyError = require('../helpers/MyError');

function validateSaleProductId(req, _res, next) {
  req.body.forEach((item, index) => {
    req.body.forEach((item2, index2) => {
      if (item.productId === item2.productId && index !== index2) {
        throw new MyError('Different products must not have the same Id', 400);
      }
    });
  });

  req.body.forEach((item) => {
    const { productId } = item;

    if (productId === undefined) {
      throw new MyError('"productId" is required', 400);
    }
  });

  next();
}

module.exports = validateSaleProductId;
