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
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

const CategoriesPage: CustomPageComponent = ({
  categories,
}: {
  categories: ProductCategory[];
}) => {
  return (
    <Container>
      <SimpleGrid cols={2}>
        {categories.map((category) => (
          <Link href={"/" + category.slug} key={category.id}>
            <BackgroundImage
              src={category.image}
              radius="sm"
              h={300}
              mb="lg"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Title color="#fff">{category.name}</Title>
            </BackgroundImage>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

CategoriesPage.getLayout = ClientLayout;

export const getStaticProps: GetStaticProps = async () => {
  const categories = await prisma.productCategory.findMany({});
  return {
    props: {
      categories,
    },
  };
};

export default CategoriesPage;
