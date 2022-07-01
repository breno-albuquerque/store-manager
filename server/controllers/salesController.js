const salesService = require('../services/salesService');

const getSales = async (req, res, next) => {
  try {
    const sales = await salesService.getSales();
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const postSale = async (req, res, next) => {
  try {
    const result = await salesService.postSales(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateSalesProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.updateSalesProduct(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteSalesProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.deleteSalesProduct(parseInt(id, 10));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
  getById,
  postSale,
  updateSalesProduct,
  deleteSalesProduct,
};