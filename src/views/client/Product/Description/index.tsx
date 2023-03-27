import { type TItemCart, useStore } from "@/store";
import type { TFillProduct } from "@/types/product";
import { Button, Group, NumberInput, Tabs, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ProductVariant } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

const Form = ({ variant }: { variant: ProductVariant }) => {
  const { addToCart, cart } = useStore();

  const maxLocalStock =
    variant.stock -
    (cart.find((p) => p.variant.id === variant.id)?.quantity || 0);

  const form = useForm<TItemCart>({
    initialValues: {
      variant,
      quantity: maxLocalStock > 0 ? 1 : 0,
    },
  });

  const onSubmit = (values: TItemCart) => {
    if (!(values.quantity > 0)) return;
    addToCart(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
      <Group>
        <NumberInput
          {...form.getInputProps("quantity")}
          max={maxLocalStock}
          min={0}
        />
        <Button type="submit">Add to Cart</Button>
      </Group>
    </form>
  );
};

export const Description = ({
  product,
  variant,
  setVariant,
}: {
  product: TFillProduct;
  variant: string;
  setVariant: Dispatch<SetStateAction<string>>;
}) => {
  console.log("variantee", variant);
  return (
    <div>
      <Title>{product.name}</Title>
      <Text>{product.description}</Text>
      <Tabs defaultValue={variant}>
        <Tabs.List>
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
            <Text>{va.description}</Text>
            <Form variant={va} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};
