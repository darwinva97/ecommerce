
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateCategory } from "@/types/category";
import { api } from "@/utils/api";

export const BtnCreateLabel = () => {
  const createMutation = api.category.create.useMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<TCreateCategory>({
    initialValues: {
      name: "",
      description: "",
      image: "",
      slug: "",
    },
  });

  const onSubmit = async (value: TCreateCategory) => {
    await createMutation.mutateAsync(value);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Category">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="name" {...form.getInputProps("name")} />
          <TextInput
            label="description"
            {...form.getInputProps("description")}
          />
          <TextInput label="slug" {...form.getInputProps("slug")} />
          <TextInput label="image url" {...form.getInputProps("image")} />
          <Button type="submit" mt="sm">
            Create Category
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Create Category</Button>
      </Group>
    </>
  );
};
