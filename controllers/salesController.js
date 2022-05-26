const salesService = require('../services/salesService');
//  const middlewares = require('../middlewares');

const getSales = async (req, res, next) => {
  try {
    const sales = await salesService.getSales();

    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
};