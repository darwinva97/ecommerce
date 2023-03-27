import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { productRouter } from "@/server/api/routers/product";
import { categoryRouter } from "@/server/api/routers/category";
import { labelRouter } from "@/server/api/routers/label";
import { variantRouter } from "@/server/api/routers/variant";
import { carouselRouter } from "@/server/api/routers/carousel";
import { paypalRouter } from "@/server/api/routers/paypal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  product: productRouter,
  category: categoryRouter,
  label: labelRouter,
  variant: variantRouter,
  carousel: carouselRouter,
  paypal: paypalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
