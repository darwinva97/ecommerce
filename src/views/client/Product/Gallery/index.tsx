import type { TFillProduct } from "@/types/product";
import { Carousel } from "@mantine/carousel";
import { Box, Card, Image, SimpleGrid } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";

export const Gallery = ({
  product,
  variant,
  setVariant,
}: {
  product: TFillProduct;
  variant: string;
  setVariant: Dispatch<SetStateAction<string>>;
}) => {
  const { variants } = product;
  const currentVariant = variants.find((va) => va.name === variant);
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section mt="sm">
        <Image
          src={String(currentVariant?.image)}
          alt={String(currentVariant?.name)}
        />
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={variants.length}>
          {variants.map((va) => (
            <Image
              onClick={() => setVariant(va.name)}
              src={va.image}
              key={va.id}
              radius="sm"
              alt={va.name}
              height={100}
              width={100}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
};
