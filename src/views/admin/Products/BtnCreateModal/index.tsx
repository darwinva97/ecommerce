import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateProduct } from "@/types/product";
import { api } from "@/utils/api";

export const BtnCreateModal = () => {
  const createMutation = api.product.create.useMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<TCreateProduct>({
    initialValues: {
      name: "",
      description: "",
      slug: "",
    },
  });

  const onSubmit = async (value: TCreateProduct) => {
    await createMutation.mutateAsync(value);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Product">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="name" {...form.getInputProps("name")} />
          <TextInput label="description" {...form.getInputProps("description")} />
          <TextInput label="slug" {...form.getInputProps("slug")} />
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
