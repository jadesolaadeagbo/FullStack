import type { CreateCartData, UpdateCartData } from '~/types';

const API_URL = import.meta.env.VITE_API_URL;

export const addToCart = async (data: CreateCartData) => {
  const response = await fetch(`${API_URL}/api/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to create cart');
  return result;
};

export const getCart = async () => {
  const response = await fetch(`${API_URL}/api/cart`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to get cart');
  return result;
};

export const updateCart = async (data: UpdateCartData) => {
  const response = await fetch(`${API_URL}/api/cart/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to update cart');
  return result;
};

export const removeCartItem = async (productId: string) => {
  const response = await fetch(`${API_URL}/api/cart/remove/${productId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to remove cart item');
  return result;
};

export const clearCart = async () => {
  const response = await fetch(`${API_URL}/api/cart/clear`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to clear cart');
  return result;
};

export const checkoutCart = async () => {
  const response = await fetch(`${API_URL}/api/cart/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to checkout cart');
  return result;
};
