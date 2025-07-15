import type {
  IProduct,
  IStore,
  CreateShopData,
  CreateProductData,
  StoreResponse,
  ProductResponse,
  UpdateShopData,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const createShop = async (data: CreateShopData) => {
  const response = await fetch(`${API_URL}/api/stores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to create store');
  return result;
};

export const createProduct = async (data: CreateProductData) => {
  const response = await fetch(`${API_URL}/api/stores/${data.storeId}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to create store');
  return result;
};

export const getAllShops = async (page: number, limit: number = 10): Promise<StoreResponse> => {
  const response = await fetch(`${API_URL}/api/stores?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to get all stores');
  }

  return {
    shops: data.stores,
    total: data.total,
    totalPages: data.totalPages,
    currentPage: data.currentPage,
  };
};

export const getAllProducts = async (
  page: number,
  limit: number = 10
): Promise<ProductResponse> => {
  const response = await fetch(`${API_URL}/api/products?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to get all products');
  }

  return {
    products: data.products,
    total: data.total,
    totalPages: data.totalPages,
    currentPage: data.currentPage,
  };
};

export const getShopById = async (storeId: string) => {
  const response = await fetch(`${API_URL}/api/store/${storeId}`, {
    method: 'GET',
  });

  const data = await response.json();
  const shop = data.store;

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return shop;
};

export const updateShop = async (storeId: string, formData: UpdateShopData) => {
  const response = await fetch(`${API_URL}/api/store/${storeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  const data = await response.json();
  const updatedShop = data.store;

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update user info');
  }

  return updatedShop;
};

export const deleteShop = async (storeId: string) => {
  const response = await fetch(`${API_URL}/api/store/${storeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update user info');
  }

  return data;
};
