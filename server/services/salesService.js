const { format } = require('date-fns');
const salesModel = require('../models/salesModel');
const MyError = require('../helpers/MyError');
const productService = require('./productsService');

function formatSales(sale) {
  return sale.map((item) => ({
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
    productName: item.name
  }));
}

const verifyProductId = (products, sale) => {
  const currProduct = products.find((product) => parseInt(product.id) === parseInt(sale.productId));
  
  if (currProduct === undefined) {
    throw new MyError('The product(s) is not available');
  }
}

function verifyProductQuantity(products, sale) {
  const currProduct = products.find((product) => parseInt(product.id) === parseInt(sale.productId));
  
  if (currProduct.quantity < sale.quantity) {
    throw new MyError('Such amount is not permitted to sell', 422);
  }
}

const getSales = async () => {
  const sales = await salesModel.getAllSales();
  const formatedSales = formatSales(sales);
  return formatedSales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (sale.length === 0) throw new MyError('Sale not found', 404);

  const salesProducts = await salesModel.getSalesProduct(id);

  const sales = salesProducts.map((item) => ({
    date: sale[0].date,
    productId: item.product_id,
    quantity: item.quantity,
  }));

  return sales;
};

const postSales = async (saleArr) => {
  const products = await productService.getProducts();

  saleArr.forEach((sale) => verifyProductId(products, sale));
  saleArr.forEach((sale) => verifyProductQuantity(products, sale));

  const date = format(new Date(), 'yyyy/MM/dd HH:mm:ss');

  const { insertId } = await salesModel.postSales(date);

  const sPromise = []
  saleArr.forEach((e) => {
    sPromise.push(salesModel.postSalesProduct(e.productId, insertId, e.quantity));
  });
  await Promise.all(sPromise)

  const pPromise = []
  saleArr.forEach(async (e) => {
    pPromise.push(productService.updateProductBySale(e.productId, e.quantity));
  });
  await Promise.all(pPromise)

  return {
    id: insertId,
    itemsSold: saleArr,
  };
};

const updateSalesProduct = async (id, [{ productId, quantity }]) => {
  const prevSale = await getSaleById(id);
  const prevProductData = prevSale.find((item) => parseInt(item.productId) === parseInt(productId));
  
  const prevQuant = prevProductData.quantity;
  const quantDiff = prevQuant - quantity;

  if (quantDiff < 0) await productService.updateProductBySale(productId, Math.abs(quantDiff));
  if (quantDiff > 0) await productService.updateProductBySale(productId, quantDiff, true);

  await salesModel.updateSalesProduct(id, productId, quantity);

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const deleteSalesProduct = async (id) => {
  const sales = await getSaleById(id);

  sales.forEach(async (sale) => {
    await productService.updateProductBySale(sale.productId, sale.quantity, true);
  });
  
  const result = await salesModel.deleteSale(id);
  
  await salesModel.deleteSalesProduct(id);

  return result;
};

module.exports = {
  getSales,
  getSaleById,
  postSales,
  updateSalesProduct,
  deleteSalesProduct,
};