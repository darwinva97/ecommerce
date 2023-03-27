import { z } from "zod";
import { ZModelProductVariant } from "./variant";

export const ZCreateOrder = z.object({
  products: z.array(
    z.object({
      product: ZModelProductVariant,
      quantity: z.number(),
    })
  ),
});

export type TCreateOrder = z.infer<typeof ZCreateOrder>;
