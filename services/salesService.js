const salesModel = require('../models/salesModel');
const MyError = require('../helpers/MyError');
const productService = require('./productsService');

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
  const date = `${new Date().toLocaleDateString('zh-Hans-CN')}\n
   ${new Date().toLocaleTimeString('en-GB')}`;

  const { insertId } = await salesModel.postSales(date);

  saleArr.forEach(async (e) => {
    await salesModel.postSalesProduct(e.productId, insertId, e.quantity);
  });

  saleArr.forEach(async (e) => {
    await productService.updateProductBySale(e.productId, e.quantity);
  });

  return {
    id: insertId,
    itemsSold: saleArr,
  };
}

async function updateSalesProduct(id, [{ productId, quantity }]) {
  const sale = await getSaleById(id);
  await salesModel.updateSalesProduct(id, productId, quantity);

  const prevQuant = sale.reduce((acc, curr) => acc + curr, 0);
  const quantDiff = prevQuant - quantity;
  if (quantDiff < 0) await productService.updateProductBySale(productId, quantity * -1);
  if (quantDiff > 0) await productService.updateProductBySale(productId, quantity, true);

  return {
    saleId: 1,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
}

async function deleteSalesProduct(id) {
  const sales = await getSaleById(id);
  sales.forEach(async (sale) => {
    await productService.updateProductBySale(sale.productId, sale.quantity, true);
  });
  
  const result = await salesModel.deleteSale(id);
  
  await salesModel.deleteSalesProduct(id);

  return result;
}

module.exports = {
  getSales,
  getSaleById,
  postSales,
  updateSalesProduct,
  deleteSalesProduct,
};