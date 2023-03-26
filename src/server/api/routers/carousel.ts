import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  ZCreateCarousel,
  ZCreateCarouselItem,
  type TUpdateCarouselItem,
  ZUpdateCarouselItem,
} from "@/types/carousel";
import { z } from "zod";

export const carouselRouter = createTRPCRouter({
  getByName: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ ctx, input }) => {
    return ctx.prisma.carousel.findFirst({
      where: {
        name: input.name
      },
      include: {
        items: true,
      },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.carousel.findMany({
      include: {
        items: true,
      },
    });
  }),

  getItemDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.carouselItem.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(ZCreateCarousel)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.carousel.create({
        data: {
          ...input,
        },
      });
    }),

  createItem: protectedProcedure
    .input(ZCreateCarouselItem)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.carouselItem.create({
        data: {
          ...input,
        },
      });
    }),

  updateItem: protectedProcedure
    .input(ZUpdateCarouselItem)
    .mutation(({ ctx, input }) => {
      const data: Omit<TUpdateCarouselItem, "id"> & { id?: string } = {
        ...input,
      };
      delete data?.id;

      return ctx.prisma.carouselItem.update({
        data,
        where: { id: input.id },
      });
    }),
});
