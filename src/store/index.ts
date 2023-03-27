import type { ProductVariant } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TItemCart = {
  quantity: number;
  variant: ProductVariant;
};

export type TStore = {
  openCart: boolean;
  cart: TItemCart[];
  addToCart: (item: TItemCart) => void;
  setOpenCart: (open?: boolean) => void;
};

export const useStore = create(
  persist<TStore>(
    (set, get) => ({
      openCart: false,
      setOpenCart: (open?: boolean) => {
        set((store) => ({
          ...store,
          openCart: typeof open === "boolean" ? open : !store.openCart,
        }));
      },
      cart: [],
      addToCart: ({ variant, quantity }: TItemCart) => {
        set((store) => {
          let newVariant = true;
          const cart = store.cart.map((p) => {
            if (p.variant.id === variant.id) {
              p.quantity += quantity;
              newVariant = false;
            }
            return p;
          });
          if (newVariant) {
            cart.push({ variant, quantity });
          }
          return {
            ...store,
            cart,
          };
        });
      },
    }),
    {
      name: "cart-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
