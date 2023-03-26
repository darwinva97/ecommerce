import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  ZCreateVariant,
  ZUpdateVariant,
  type TUpdateVariant,
} from "@/types/variant";

export const variantRouter = createTRPCRouter({
  getAllFromIdProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.productVariant.findMany({
        where: { productId: input.id },
        include: {
          product: true,
        },
      });
    }),
  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.productVariant.findFirst({
        where: { id },
        include: {
          product: true,
        },
      });
    }),
  create: protectedProcedure
    .input(ZCreateVariant)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productVariant.create({ data: input });
    }),

  update: protectedProcedure
    .input(ZUpdateVariant)
    .mutation(({ ctx, input }) => {
      const data: Omit<TUpdateVariant, "id"> & { id?: string } = { ...input };
      delete data?.id;
      
      return ctx.prisma.productVariant.update({
        data,
        where: { id: input.id },
      });
    }),
});
