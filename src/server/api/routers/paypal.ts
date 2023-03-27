/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import paypal from "@paypal/checkout-server-sdk";
import { env } from "@/env.mjs";
import { ZCreateOrder } from "@/types/paypal";

const environment = new paypal.core.SandboxEnvironment(
  env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  env.PAYPAL_CLIENT_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

export const paypalRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ZCreateOrder)
    .mutation(async ({ ctx, input }) => {
      const purchase_units = input.products.map(({ product, quantity }) => ({
        amount: {
          currency_code: "USD",
          value: String(product.offer_price * quantity),
        },
      }));
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: "CAPTURE",
        purchase_units,
      });

      const responsePaypal = await client.execute(request);

      const newOrder = await ctx.prisma.order.create({
        data: {
          userId: ctx.session.user.id,
          payload: JSON.stringify({
            responsePaypal,
          }),
        },
      });

      return newOrder;
    }),
});
