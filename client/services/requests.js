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

export const deleteProduct = async () => {
  const data = instance.get('/products');
  return data;
};

export const getSales = async () => {

};

export const getSaleById = async () => {

};

export const postSale = async () => {

};

export const updateSale = async () => {

};

export const deleteSale = async () => {

};
