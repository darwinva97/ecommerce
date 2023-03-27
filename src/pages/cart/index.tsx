import { ClientLayout } from "@/components/layouts/Client";
import type { CustomPageComponent } from "@/pages/_app";
import { Button, Center, Container, Table, Title } from "@mantine/core";
import { useStore } from "@/store";
import { BtnPaypal } from "@/components/BtnPaypal";

const CartPage: CustomPageComponent = () => {
  const { cart } = useStore();

  const total = cart.reduce(
    (total, { variant: { offer_price }, quantity }) =>
      (total += offer_price * quantity * quantity),
    0
  );

  return (
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

      {/* <Button color="dark" w="100%" onClick={initPayment}>
        Iniciar pago
      </Button> */}
      <Center>
        <BtnPaypal />
      </Center>
    </Container>
  );
};

CartPage.getLayout = ClientLayout;

export default CartPage;
