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

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getSalesById(id);

    res.status(200).json(sale);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

module.exports = {
  getSales,
  getById,
};