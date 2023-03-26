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
