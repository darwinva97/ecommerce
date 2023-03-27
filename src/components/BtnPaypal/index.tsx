import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { env } from "@/env.mjs";

export const BtnPaypal = () => {
  return (
    <PayPalScriptProvider
      options={{ "client-id": env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
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
