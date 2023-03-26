import { z } from "zod";

export const ZCreateCarousel = z.object({
  name: z.string(),
});

export type TCreateCarousel = z.infer<typeof ZCreateCarousel>;

export const ZUpdateCarouselItem = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  image: z.string(),
  html: z.string(),
  carouselId: z.string(),
});

export type TUpdateCarouselItem = z.infer<typeof ZUpdateCarouselItem>;

export const ZCreateCarouselItem = z.object({
  name: z.string(),
  url: z.string(),
  image: z.string(),
  html: z.string(),
  carouselId: z.string(),
});

export type TCreateCarouselItem = z.infer<typeof ZCreateCarouselItem>;
