const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const formatSales = (sale) => sale.map((item) => ({
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
  }));

async function getSales() {
  const sales = await salesModel.getAll();
  
  const formatedSales = formatSales(sales);

  return formatedSales;
}

async function getSalesById(id) {
  const sale = await salesModel.getById(id);

  if (sale.length === 0) {
    throw new Error('Sale not found');
  }

  const salesProducts = await salesModel.getSalesProduct(id);
  const productsPromise = [];
  salesProducts.forEach((item) => 
    productsPromise.push(productsService.getProducts(item.product_id)));
  const products = await Promise.all(productsPromise);

  const sales = products.map((item) => ({
    date: sale[0].date,
    productId: item.id,
    quantity: item.quantity,
  }));

  return sales;
}

module.exports = {
  getSales,
  getSalesById
};