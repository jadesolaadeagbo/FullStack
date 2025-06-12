// stores/authStore.ts
import { create } from "zustand";
import { authenticationStatus } from "~/api/auth";
import type { User } from "~/types";

interface AuthStore {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    set({ loading: true });
    try {
      const user = await authenticationStatus();
      set({ user });

    } catch (error: any) {
      if (error.message !== "Unauthorized") {
        console.error("Unexpected error fetching user:", error);
      }
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
