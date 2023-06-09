import { prisma } from "@/server/db";
import type { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import { type CustomPageComponent } from "@/pages/_app";
import { ClientLayout } from "@/components/layouts/Client";
import type { Product, ProductCategory, ProductVariant } from "@prisma/client";
import {
  BackgroundImage,
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const CategoryPage: CustomPageComponent = ({
  category,
}: {
  category:
    | (ProductCategory & {
        products: (Product & {
          variants: ProductVariant[];
        })[];
      })
    | null;
}) => {
  return (
    <div>
      <BackgroundImage
        src={String(category?.image)}
        radius="sm"
        h={300}
        mb="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <Title align="center" color="#fff">
            {category?.name}
          </Title>
          <Link
            href="/categories"
            style={{ textAlign: "center", color: "#fff", fontSize: ".8em" }}
          >
            Ver más categorías
          </Link>
        </Stack>
      </BackgroundImage>
      <Container>
        <SimpleGrid
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 3 },
            { minWidth: 1200, cols: 4 },
          ]}
        >
          {category?.products
            .filter((p) => p.variants.length > 0)
            ?.map((p) => (
              <Link href={"/" + category.slug + "/" + p.slug} key={p.id}>
                <Box>
                  <Text align="center" weight={"bold"}>
                    {p.name}
                  </Text>
                  <Image
                    src={String(p.variants[0]?.image)}
                    alt={p.name}
                    width={250}
                    height={250}
                    style={{maxWidth: "100%"}}
                  />
                </Box>
              </Link>
            ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

CategoryPage.getLayout = ClientLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.categoryName);
  const category = await prisma.productCategory.findFirst({
    where: {
      slug,
    },
    include: {
      products: {
        include: {
          variants: true,
        },
      },
    },
  });

  if (!category) {
    return {
      notFound: true,
      revalidate: 15,
    };
  }

  return {
    props: {
      category,
    },
    revalidate: 15,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true,
    },
  });

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((cat) => ({
    params: { categoryName: cat.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default CategoryPage;
