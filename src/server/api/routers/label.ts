import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { ZCreateLabel } from "@/types/label";

export const labelRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productLabel.findMany({
      include: {
        products: true,
      },
    });
  }),

  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.productLabel.findFirst({
        where: { id },
        include: {
          products: true,
        },
      });
    }),

  create: protectedProcedure
    .input(ZCreateLabel)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.productLabel.create({
        data: {
          ...input,
        },
      });
    }),
});
