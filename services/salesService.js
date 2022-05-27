const salesModel = require('../models/salesModel');
const MyError = require('../helpers/MyError');

const formatSales = (sale) => sale.map((item) => ({
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
  }));

async function getSales() {
  const sales = await salesModel.getAllSales();
  
  const formatedSales = formatSales(sales);

  return formatedSales;
}

async function getSaleById(id) {
  const sale = await salesModel.getSaleById(id);

  if (sale.length === 0) {
    throw new MyError('Sale not found', 404);
  }

  const salesProducts = await salesModel.getSalesProduct(id);

  const sales = salesProducts.map((item) => ({
    date: sale[0].date,
    productId: item.product_id,
    quantity: item.quantity,
  }));

  return sales;
}

async function postSales(saleArr) {
  const date = `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString()}`;

  const { insertId } = await salesModel.postSales(date);

  saleArr.forEach(async (e) => {
    await salesModel.postSalesProduct(e.productId, insertId, e.quantity);
  });

  return {
    id: insertId,
    itemsSold: saleArr,
  };
}

module.exports = {
  getSales,
  getSaleById,
  postSales,
};