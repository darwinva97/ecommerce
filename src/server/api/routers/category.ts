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
