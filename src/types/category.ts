import { z } from "zod";

export const ZCreateCategory = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  slug: z.string(),
});

export type TCreateCategory = z.infer<typeof ZCreateCategory>;
