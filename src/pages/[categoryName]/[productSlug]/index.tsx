import { ClientLayout } from "@/components/layouts/Client";
import { type CustomPageComponent } from "@/pages/_app";
import { prisma } from "@/server/db";
import type { TFillProduct } from "@/types/product";
import { ClientProductView } from "@/views/client/Product";
import type { GetStaticPaths, GetStaticProps } from "next";

const ProductPage: CustomPageComponent = ({
  product,
}: {
  product: TFillProduct;
}) => {
  if (product.variants.length === 0) {
    return (
      <h1>Todavía no tenemos productos disponibilidad de este producto.</h1>
    );
  }
  return <ClientProductView product={product} />;
};

ProductPage.getLayout = ClientLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryName = String(params?.categoryName);
  const slug = String(params?.productSlug);
  const category = await prisma.productCategory.findFirst({
    where: {
      slug: categoryName,
    },
  });
  const product = await prisma.product.findFirst({
    where: {
      slug,
      categoryIDs: {
        has: category?.id,
      },
    },
    include: {
      variants: true,
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
      labels: {
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
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true,
    },
  });

  const paths = categories
    .map((cat) =>
      cat.products.map((p) => ({
        params: {
          productSlug: p.slug,
          categoryName: cat.slug,
        },
      }))
    )
    .flat();

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default ProductPage;
