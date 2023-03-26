import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateProduct } from "@/types/product";
import { api } from "@/utils/api";

export const BtnCreateModal = () => {
  const createMutation = api.product.create.useMutation();
  const { data: categories } = api.category.getAll.useQuery();
  const { data: labels } = api.label.getAll.useQuery();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<TCreateProduct>({
    initialValues: {
      name: "",
      description: "",
      slug: "",
      categoryIDs: [],
      labelIDs: [],
    },
  });

  const onSubmit = async (value: TCreateProduct) => {
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
    <>
      <Modal opened={opened} onClose={close} title="Create Product">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput
            label="Description"
            {...form.getInputProps("description")}
          />
          <TextInput label="slug" {...form.getInputProps("slug")} />
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
      </Modal>

      <Group position="center">
        <Button onClick={open}>Create Product</Button>
      </Group>
    </>
  );
};
