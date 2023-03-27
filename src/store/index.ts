import { create } from "zustand";

export type TStore = {
  openCart: boolean;
  setOpenCart: (open?: boolean) => void;
};

export const useStore = create<TStore>((set, get) => ({
  openCart: false,
  setOpenCart: (open?: boolean) => {
    set((store) => ({
      ...store,
      openCart: typeof open === "boolean" ? open : !store.openCart,
    }));
  },
}));
