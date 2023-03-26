import { Button, TextInput, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateProduct } from "@/types/product";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import type { Product } from "@prisma/client";

const Form = ({ product }: { product: Product }) => {
  const createMutation = api.product.create.useMutation();
  const { data: categories } = api.category.getAll.useQuery();
  const { data: labels } = api.label.getAll.useQuery();

  const form = useForm<TCreateProduct>({
    initialValues: product,
  });

  const onSubmit = async (value: TCreateProduct) => {
    console.log(value);
    await createMutation.mutateAsync(value);
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
        Create Product
      </Button>
    </form>
  );
};

export const AdminProductView = () => {
  const router = useRouter();
  const id = String(router.query.productId);
  const { data: product } = api.product.getDetail.useQuery({ id });

  return product ? (
    <Form product={product} />
  ) : (
    <strong>Este producto no existe</strong>
  );
};
