import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { ZCreateProduct } from "@/types/product";
import { Product } from "@prisma/client";

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
    
  create2: protectedProcedure
  .input(ZCreateProduct)
  .mutation(async ({ ctx, input }) => {
    // const category = await ctx.prisma.productCategory.create({});
    const newProduct: Product = await ctx.prisma.product.create({ data: input });
    return newProduct
  }),
});
