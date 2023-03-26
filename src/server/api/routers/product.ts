import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import  {
  type TUpdateProduct,
  ZCreateProduct,
  ZUpdateProduct,
} from "@/types/product";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        variants: true,
        labels: true,
        categories: true,
      },
    });
  }),
  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.product.findFirst({
        where: { id },
        include: {
          variants: true,
          labels: true,
          categories: true,
        },
      });
    }),
  create: protectedProcedure
    .input(ZCreateProduct)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({ data: input });
    }),

  update: protectedProcedure
    .input(ZUpdateProduct)
    .mutation(({ ctx, input }) => {
      const data: Omit<TUpdateProduct, "id"> & { id?: string } = { ...input };
      delete data?.id;

      return ctx.prisma.product.update({
        data,
        where: { id: input.id },
      });
    }),
});
