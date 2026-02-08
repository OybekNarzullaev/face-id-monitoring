import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Auth } from "../types/account";

interface AuthStore {
  auth?: Auth;
  setAuth: (auth?: Auth) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      auth: undefined,

      setAuth: (auth) => set({ auth }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
