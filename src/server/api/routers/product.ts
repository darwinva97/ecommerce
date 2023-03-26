import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
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

  getSimilar: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const id = input.id;
      const product = await ctx.prisma.product.findFirst({
        where: { id },
        include: {
          categories: {
            include: {
              products: {
                include: {
                  variants: true,
                  categories: true,
                },
              },
            },
          },
        },
      });
      if (!product) return [];

      const similarCategory = product.categories.map((cat) => cat.products).flat();

      return similarCategory.filter(
        (pr) => pr.id !== product.id && pr.variants.length >= 1
      );
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
    .mutation(async ({ ctx, input }) => {
      const data: Omit<TUpdateProduct, "id"> & { id?: string } = { ...input };
      delete data?.id;

      const promisesCleanCategories = ctx.prisma.productCategory
        .findMany({
          where: {
            productIDs: {
              has: input.id,
            },
          },
        })
        .then((prevCategoriesConnecteds) => {
          return Promise.all(
            prevCategoriesConnecteds.map(async ({ id, productIDs }) => {
              return await ctx.prisma.productCategory.update({
                where: {
                  id,
                },
                data: {
                  productIDs: productIDs.filter((pId) => pId !== input.id),
                },
              });
            })
          );
        });

      const promisesCleanLabels = ctx.prisma.productLabel
        .findMany({
          where: {
            productIDs: {
              has: input.id,
            },
          },
        })
        .then((prevLabelsConnecteds) => {
          return Promise.all(
            prevLabelsConnecteds.map(async ({ id, productIDs }) => {
              return await ctx.prisma.productLabel.update({
                where: {
                  id,
                },
                data: {
                  productIDs: productIDs.filter((pId) => pId !== input.id),
                },
              });
            })
          );
        });

      await Promise.all([promisesCleanCategories, promisesCleanLabels]);

      await ctx.prisma.productCategory.updateMany({
        where: {
          id: {
            in: input.categoryIDs,
          },
        },
        data: {
          productIDs: {
            push: input.id,
          },
        },
      });

      await ctx.prisma.productLabel.updateMany({
        where: {
          id: {
            in: input.labelIDs,
          },
        },
        data: {
          productIDs: {
            push: input.id,
          },
        },
      });

      const productUpdated = await ctx.prisma.product.update({
        data,
        where: { id: input.id },
      });

      return productUpdated;
    }),
});
