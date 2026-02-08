import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",

      setMode: (mode) => set({ mode }),

      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "mui-theme",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
