const MyError = require('../helpers/MyError');

function validateProductName(req, _res, next) {
  const { name } = req.body;

  if (!name) {
    throw new MyError('"name" is required', 400);
  }

  if (name.length < 5) {
    throw new MyError('"name" length must be at least 5 characters long', 422);
  }

  next();
}

module.exports = validateProductName;