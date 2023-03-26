import type { TFillProduct } from "@/types/product";
import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

export const Gallery = ({
  product,
}: {
  product: TFillProduct;
  variant: number;
  setVariant: Dispatch<SetStateAction<number>>;
}) => {
  const size = 500
  const { variants } = product
  return (
    <Box>
      {variants.length === 1 && (
        <Image
          width={size}
          height={size}
          src={String(variants[0]?.image)}
          alt={String(variants[0]?.name)}
        />
      )}
      {variants.length > 1 && (
        <Carousel
          height={size}
          dragFree
          loop={true}
          slideGap="md"
          align="start"
        >
          {variants.map((va) => (
            <Carousel.Slide key={va.id}>
              <Image width={size} height={size} src={va.image} alt={va.name} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Box>
  );
};
