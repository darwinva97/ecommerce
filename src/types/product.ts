import { z } from "zod";

export const ZCreateProduct = z.object({
  description: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type TCreateProduct = z.infer<typeof ZCreateProduct>