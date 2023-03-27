import { useStore } from "@/store";
import { Button, Container, Drawer, Table, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export const Cart = () => {
  const { openCart, setOpenCart, cart } = useStore();
  const { push } = useRouter();

  const total = cart.reduce(
    (total, { variant: { offer_price }, quantity }) =>
      (total += offer_price * quantity * quantity),
    0
  );

  return (
    <Drawer
      position="right"
      opened={openCart}
      onClose={() => setOpenCart(false)}
      title="Authentication"
    >
      <Container>
        <Title>Cart</Title>
        <Table my="lg">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Monto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ variant, quantity }, index) => (
              <tr key={variant.id}>
                <td>{index + 1}</td>
                <td>{variant.name}</td>
                <td>{variant.price}</td>
                <td>{variant.offer_message}</td>
                <td>{quantity}</td>
                <td>{(variant.offer_price * quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5}>Subtotal:</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          color="dark"
          w="100%"
          onClick={() => {
            setOpenCart(false);
            void push("/cart");
          }}
        >
          Ir al carrito Ahora
        </Button>
      </Container>
    </Drawer>
  );
};
