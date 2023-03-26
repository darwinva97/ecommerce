import { z } from "zod";

export const ZCreateLabel = z.object({
  name: z.string(),
  color: z.string(),
  slug: z.string(),
});

export type TCreateLabel = z.infer<typeof ZCreateLabel>;
