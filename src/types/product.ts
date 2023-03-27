import type {
  Product,
  ProductCategory,
  ProductLabel,
  ProductVariant,
} from "@prisma/client";
import { z } from "zod";

export const ZModelProduct = z.object({
  id: z.string(),
  description: z.string(),
  name: z.string(),
  slug: z.string(),
  categoryIDs: z.array(z.string()),
  labelIDs: z.array(z.string()),
});

export type TModelProduct = z.infer<typeof ZModelProduct>;

export const ZUpdateProduct = ZModelProduct;
export type TUpdateProduct = z.infer<typeof ZUpdateProduct>;

export const ZCreateProduct = z.object({
  description: z.string(),
  name: z.string(),
  slug: z.string(),
  categoryIDs: z.array(z.string()),
  labelIDs: z.array(z.string()),
});

export type TCreateProduct = z.infer<typeof ZCreateProduct>;

export type TFillProduct = Product & {
  variants: ProductVariant[];
  categories: (ProductCategory & {
    products: (Product & {
      variants: ProductVariant[];
      categories: ProductCategory[];
    })[];
  })[];
  labels: (ProductLabel & {
    products: (Product & {
      variants: ProductVariant[];
      categories: ProductCategory[];
    })[];
  })[];
};
