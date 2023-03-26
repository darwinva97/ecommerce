import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { ZCreateCategory } from "@/types/category";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productCategory.findMany({
      include: {
        products: true,
      },
    });
  }),

  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.productCategory.findFirst({
        where: { id },
        include: {
          products: true,
        },
      });
    }),

  getDetailBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      const slug = input.slug;
      return ctx.prisma.productCategory.findFirst({
        where: { slug },
        include: {
          products: {
            include:{
              variants: true
            }
          },
        },
      });
    }),
  create: protectedProcedure
    .input(ZCreateCategory)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productCategory.create({
        data: {
          ...input,
          parent: "",
        },
      });
    }),
});
