import {
  Button,
  TextInput,
  MultiSelect,
  Title,
  Divider,
  Box,
  Text,
  Group,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import type { Product } from "@prisma/client";
import { BtnCreateVariant } from "./BtnCreateVariant";
import Image from "next/image";
import { BtnUpdateVariant } from "./BtnUpdateVariant";

const Form = ({ product }: { product: Product }) => {
  const updateMutation = api.product.update.useMutation();
  const { data: categories } = api.category.getAll.useQuery();
  const { data: labels } = api.label.getAll.useQuery();

  const form = useForm<Product>({
    initialValues: product,
  });

  const onSubmit = async (value: Product) => {
    await updateMutation.mutateAsync(value);
    close();
  };

  const selectCategories = (categories || [])?.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));
  const selectLabels = (labels || [])?.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
      <TextInput label="Name" {...form.getInputProps("name")} />
      <TextInput label="Description" {...form.getInputProps("description")} />
      <TextInput label="Slug" {...form.getInputProps("slug")} />
      <MultiSelect
        data={selectCategories}
        label="Categories"
        placeholder="Pick Categories"
        {...form.getInputProps("categoryIDs")}
      />
      <MultiSelect
        data={selectLabels}
        label="Labels"
        placeholder="Pick Labels"
        {...form.getInputProps("labelIDs")}
      />

      <Button type="submit" mt="sm">
        Update Product
      </Button>
    </form>
  );
};

export const AdminProductView = () => {
  const router = useRouter();
  const id = String(router.query.productId);
  const { data: product } = api.product.getDetail.useQuery({ id });

  return product ? (
    <Box>
      <Title order={2}>General</Title>
      <Form product={product} />
      <Divider my={"md"} />
      <Group>
        <Title order={2}>Variants</Title>
        <BtnCreateVariant productId={id} />
      </Group>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 4 },
          { minWidth: 1200, cols: 5 },
        ]}
      >
        {(product?.variants || []).map((variant) => (
          <Box key={variant.id} sx={{ maxWidth: "155px" }}>
            <Text align="center">{variant.name}</Text>
            <Text align="center">
              <span>{variant.offer_price}</span>
              <span style={{ marginLeft: ".5em", textDecoration: "line-through" }}>
                ({variant.price})
              </span>
            </Text>
            <Image
              src={variant.image}
              alt={variant.name}
              width={150}
              height={150}
            />
            <BtnUpdateVariant id={variant.id} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  ) : (
    <strong>Este producto no existe</strong>
  );
};
