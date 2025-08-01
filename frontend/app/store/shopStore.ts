// stores/productStore.ts
import { create } from 'zustand';
import { getAllShops, createShop, deleteShop, updateShop, getShopById } from '~/api/shop';
import type { IStore, UpdateShopData } from '~/types';

interface ShopStore {
  shops: IStore[];
  selectedShop: IStore | null;
  loading: boolean;
  page: number;
  total: number;
  totalPages: number;
  setShops: (shops: IStore[]) => void;
  fetchShops: (page?: number) => Promise<void>;
  fetchSingleShop: (id: string) => Promise<void>;
  createShop: (payload: { name: string; description: string; location: string }) => Promise<void>;
  updateShop: (id: string, payload: UpdateShopData) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
}

export const useShopStore = create<ShopStore>((set, get) => ({
  shops: [],
  selectedShop: null,
  loading: false,
  page: 1,
  total: 0,
  totalPages: 1,

  setShops: (shops) => set({ shops }),

  fetchShops: async (page = 1) => {
    set({ loading: true });
    try {
      const { shops, total, totalPages } = await getAllShops(page);
      set({ shops, total, page, totalPages });
    } catch (error) {
      console.error('Failed to fetch shops:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchSingleShop: async (id) => {
    set({ loading: true });
    try {
      const shop = await getShopById(id);
      set({ selectedShop: shop });
      return shop;
    } catch (error) {
      console.error('Failed to fetch shop:', error);
    } finally {
      set({ loading: false });
    }
  },

  createShop: async (payload) => {
    await createShop(payload);
    const page = 1;
    const { shops, total, totalPages } = await getAllShops(page);
    set({ shops, total, totalPages });
  },
  deleteShop: async (id) => {
    await deleteShop(id);
    await get().fetchShops(get().page);
  },

  updateShop: async (id, payload) => {
    await updateShop(id, payload);
    await get().fetchShops(get().page);
  },
}));
