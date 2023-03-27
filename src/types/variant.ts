import { z } from "zod";

export const ZModelProductVariant = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  stock: z.number(),
  price: z.number(),
  offer_price: z.number(),
  offer_message: z.string(),
  productId: z.string(),
});
export type TModelProductVariant = z.infer<typeof ZModelProductVariant>;

export const ZUpdateVariant = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  stock: z.number(),
  price: z.number(),
  offer_price: z.number(),
  offer_message: z.string(),
  productId: z.string(),
});
export type TUpdateVariant = z.infer<typeof ZUpdateVariant>;

export const ZCreateVariant = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  stock: z.number(),
  price: z.number(),
  offer_price: z.number(),
  offer_message: z.string(),
  productId: z.string(),
});

export type TCreateVariant = z.infer<typeof ZCreateVariant>;
