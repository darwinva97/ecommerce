/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { env } from "@/env.mjs";
import { useStore } from "@/store";
import { api } from "@/utils/api";

export const BtnPaypal = () => {
  const { cart } = useStore();
  const createMutation = api.paypal.create.useMutation();
  return (
    <PayPalScriptProvider
      options={{ "client-id": env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        createOrder={async () => {
          try {
            const result = await createMutation.mutateAsync({
              products: cart.map((p) => ({
                quantity: p.quantity,
                product: p.variant,
              })),
            });
            console.log(result);
            const id = (JSON.parse(result.payload) as any)?.responsePaypal
              ?.result?.id;
            console.log(id);
            return id;
          } catch (error) {
            console.log(error);
            return String(error);
          }
        }}
        onCancel={(data) => console.log("compra cancelada", data)}
        onApprove={async (data, actions) => {
          console.log(data);
          void (await actions?.order?.capture());
        }}
        style={{ layout: "horizontal", color: "blue" }}
      />
    </PayPalScriptProvider>
  );
};
