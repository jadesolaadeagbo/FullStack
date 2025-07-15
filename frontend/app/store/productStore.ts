// stores/productStore.ts
import { create } from 'zustand';
import { getAllProducts, createProduct } from '~/api/shop';
import type { IProduct } from '~/types';
import type { CreateProductData } from '~/types';

interface ProductStore {
  products: IProduct[];
  loading: boolean;
  page: number;
  total: number;
  totalPages: number;
  fetchProducts: (page?: number) => Promise<void>;
  createProduct: (payload: CreateProductData) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  page: 1,
  total: 0,
  totalPages: 1,

  fetchProducts: async (page = 1) => {
    set({ loading: true });
    try {
      const { products, total, totalPages } = await getAllProducts(page);
      set({ products, total, page, totalPages });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      set({ loading: false });
    }
  },
  createProduct: async (payload) => {
    await createProduct(payload);
    const page = 1;
    const { products, total, totalPages } = await getAllProducts(page);
    set({ products, total, totalPages });
  },
}));
