import type { TFillProduct } from "@/types/product";
import { Container, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { Description } from "./Description";
import { Footer } from "./Footer";
import { Gallery } from "./Gallery";

export const ClientProductView = ({ product }: { product: TFillProduct }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [variant, setVariant] = useState(String(product.variants[0]?.name));

  return (
    <Container>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
        spacing="xl"
      >
        <Gallery product={product} variant={variant} setVariant={setVariant} />
        <Description
          product={product}
          variant={variant}
          setVariant={setVariant}
        />
      </SimpleGrid>
      <Footer product={product} />
      {/* <Group align={"start"}>
        <RenderImage variants={product.variants} />
        <Stack>
          <Title>{product.name}</Title>
        </Stack>
      </Group>
      <pre>{JSON.stringify(product, null, 3)}</pre> */}
    </Container>
  );
};
