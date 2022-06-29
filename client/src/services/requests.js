import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProducts = async () => {
  try {
    const response = await instance.get('/products');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postProduct = async (product) => {
  try {
    const response = await instance.post('/products', product);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (editedProduct) => {
  try {
    const { id, name, quantity } = editedProduct;

    const response = await instance.put(`/products/${id}`, { name, quantity });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSales = async () => {
  try {
    const response = await instance.get('/sales');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSaleById = async (id) => {
  try {
    const response = await instance.get(`/sales${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postSale = async (sale) => {
  try {
    const response = await instance.post('/sales', sale);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateSale = async (id, sale) => {
  try {
    const response = await instance.put(`/sales${id}`, sale);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await instance.delete(`/sales/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
