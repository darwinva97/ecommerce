import type { TFillProduct } from "@/types/product";
import { Tabs, Text, Title } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";

export const Description = ({
  product,
  variant,
  setVariant,
}: {
  product: TFillProduct;
  variant: string;
  setVariant: Dispatch<SetStateAction<string>>;
}) => {
  console.log("variantee", variant)
  return (
    <div>
      <Title>{product.name}</Title>
      <Text>{product.description}</Text>
      <Tabs defaultValue={variant}>
        <Tabs.List >
          {product.variants.map((va) => (
            <Tabs.Tab
              value={va.name}
              key={va.id}
              onClick={() => setVariant(va.name)}
            >
              {va.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {product.variants.map((va) => (
          <Tabs.Panel value={va.name} key={va.id} pt="xs">
            {va.description}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};
