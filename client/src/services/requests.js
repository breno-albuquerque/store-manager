import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProducts = async () => {
  const data = await instance.get('/products');
  return data;
};

export const getProductById = async (id) => {
  const data = await instance.get(`/products/${id}`);
  return data;
};

export const postProduct = async (product) => {
  const data = await instance.post('/products', product);
  return data;
};

export const updateProduct = async (id, product) => {
  const data = await instance.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const data = await instance.delete(`/products/${id}`);
  return data;
};

export const getSales = async () => {
  const data = await instance.get('/sales');
  return data;
};

export const getSaleById = async (id) => {
  const data = await instance.get(`/sales${id}`);
  return data;
};

export const postSale = async (sale) => {
  const data = await instance.post('/sales', sale);
  return data;
};

export const updateSale = async (id, sale) => {
  const data = await instance.put(`/sales${id}`, sale);
  return data;
};

export const deleteSale = async (id) => {
  const data = await instance.delete(`/sales${id}`);
  return data;
};
