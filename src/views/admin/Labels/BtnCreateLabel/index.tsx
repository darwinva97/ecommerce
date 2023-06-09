import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateLabel } from "@/types/label";
import { api } from "@/utils/api";

export const BtnCreateLabel = () => {
  const createMutation = api.label.create.useMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<TCreateLabel>({
    initialValues: {
      name: "",
      color: "",
      slug: "",
    },
  });

  const onSubmit = async (value: TCreateLabel) => {
    await createMutation.mutateAsync(value);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Label">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="name" {...form.getInputProps("name")} />
          <TextInput label="color" {...form.getInputProps("color")} />
          <TextInput label="slug" {...form.getInputProps("slug")} />
          <Button type="submit" mt="sm">
            Create Label
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Create Label</Button>
      </Group>
    </>
  );
};
