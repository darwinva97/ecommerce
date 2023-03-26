import type { TFillProduct } from "@/types/product";
import { Carousel } from "@mantine/carousel";
import { Box, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Footer = ({ product }: { product: TFillProduct }) => {
  const byCategories = product.categories
    .map((cat) =>
      cat.products.filter(
        (pr) => pr.variants.length > 0 && pr.id !== product.id
      )
    )
    .flat();
  const byLabels = product.labels
    .map((cat) =>
      cat.products.filter(
        (pr) =>
          pr.variants.length > 0 &&
          pr.id !== product.id &&
          pr.categories?.length > 0 &&
          byCategories.find((prCat) => prCat.id !== pr.id)
      )
    )
    .flat();
  const router = useRouter();
  const categoryName = String(router.query.categoryName);

  return (
    <Stack spacing={"md"} mt="xl">
      <Box>
        <Title order={4}>En la misma categoría:</Title>
        <Carousel slideSize="33.333333%" slidesToScroll={3}>
          {byCategories?.map((product) => (
            <Carousel.Slide key={product.id}>
              <Link href={"/" + categoryName + "/" + product.slug}>
                <Image
                  src={String(product.variants[0]?.image)}
                  alt={String(product.variants[0]?.name)}
                  width={150}
                  height={150}
                />
                <Text align="center">{product.name}</Text>
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>

      {byLabels?.length > 0 && (
        <Box>
          <Title order={4}>Otros productos relacionados:</Title>
          <Carousel slideSize="33.333333%" slidesToScroll={3}>
            {byLabels?.map((product) => (
              <Carousel.Slide key={product.id}>
                <Link
                  href={
                    "/" +
                    String(product.categories[0]?.slug) +
                    "/" +
                    product.slug
                  }
                >
                  <Image
                    src={String(product.variants[0]?.image)}
                    alt={String(product.variants[0]?.name)}
                    width={150}
                    height={150}
                  />
                  <Text align="center">{product.name}</Text>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      )}
    </Stack>
  );
};
