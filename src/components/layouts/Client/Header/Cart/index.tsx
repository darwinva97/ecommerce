import { useStore } from "@/store";
import { Drawer } from "@mantine/core";
import React from "react";

export const Cart = () => {
  const { openCart, setOpenCart } = useStore();
  return (
    <Drawer
      position="right"
      opened={openCart}
      onClose={() => setOpenCart(false)}
      title="Authentication"
    >
      {/* Drawer content */}
    </Drawer>
  );
};
