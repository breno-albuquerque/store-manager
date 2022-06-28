import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProducts = async () => {
  const response = await instance.get('/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await instance.get(`/products/${id}`);
  return response.data;
};

export const postProduct = async (product) => {
  const response = await instance.post('/products', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await instance.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await instance.delete(`/products/${id}`);
  return response.data;
};

export const getSales = async () => {
  const response = await instance.get('/sales');
  return response.data;
};

export const getSaleById = async (id) => {
  const response = await instance.get(`/sales${id}`);
  return response.data;
};

export const postSale = async (sale) => {
  const response = await instance.post('/sales', sale);
  return response.data;
};

export const updateSale = async (id, sale) => {
  const response = await instance.put(`/sales${id}`, sale);
  return response.data;
};

export const deleteSale = async (id) => {
  const response = await instance.delete(`/sales${id}`);
  return response.data;
};
