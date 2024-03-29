const MyError = require('../helpers/MyError');

function validateSaleQuantity(req, _res, next) {
  req.body.forEach((item) => {
    const { quantity } = item;

    if (quantity === undefined) {
      throw new MyError('"quantity" is required', 400);
    }

    if (parseInt(quantity, 10) <= 0) {
      throw new MyError('"quantity" must be greater than or equal to 1', 422);
    }
  });

  next();
}

module.exports = validateSaleQuantity;
