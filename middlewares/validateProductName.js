const MyError = require('../helpers/MyError');

function validateProductName(req, _res, next) {
  const { name } = req.body;

  console.log(name);

  if (!name) {
    console.log('aqui');
    throw new MyError('"name" is required', 400);
  }

  if (name.length < 5) {
    throw new MyError('"name" length must be at least 5 characters long', 422);
  }

  next();
}

module.exports = validateProductName;