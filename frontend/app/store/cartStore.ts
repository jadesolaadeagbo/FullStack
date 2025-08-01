import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IProduct, CartItem } from '~/types';
import {
  addToCart as apiAddToCart,
  getCart as apiGetCart,
  updateCart as apiUpdateCart,
  removeCartItem as apiRemoveCartItem,
  clearCart as apiClearCart,
  checkoutCart as apiCheckoutCart,
} from '~/api/cart';

interface CartStore {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (product: IProduct) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
}

let cartFetched = false;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      fetchCart: async () => {
        if (cartFetched) return;
        cartFetched = true;
        set({ loading: true });
        try {
          const result = await apiGetCart();
          set({ items: result.items, loading: false });
        } catch (err) {
          console.error(err);
        } finally {
          set({ loading: false });
        }
      },

      addToCart: async (product) => {
        try {
          await apiAddToCart({ productId: product._id, quantity: 1 });
          await get().fetchCart();
        } catch (err) {
          console.error(err);
        }
      },

      updateQuantity: async (productId, quantity) => {
        try {
          const updatedCart = await apiUpdateCart({ productId, quantity });
          set({ items: updatedCart.items });
                } catch (err) {
          console.error(err);
        }
      },

      removeItem: async (productId) => {
        try {
          await apiRemoveCartItem(productId);
          set((state) => ({
            items: state.items.filter((item) => item.product._id !== productId),
          }));
        } catch (err) {
          console.error(err);
        }
      },

      clearCart: async () => {
        try {
          await apiClearCart();
          set({ items: [] });
        } catch (err) {
          console.error(err);
        }
      },

      checkout: async () => {
        try {
          await apiCheckoutCart();
          set({ items: [] });
        } catch (err) {
          console.error(err);
        }
      },
    }),
    { name: 'cart-storage' }
  )
);
