import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateCarousel } from "@/types/carousel";
import { api } from "@/utils/api";

export const BtnCreateCarousel = () => {
  const createMutation = api.carousel.create.useMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<TCreateCarousel>({
    initialValues: {
      name: "",
    },
  });

  const onSubmit = async (value: TCreateCarousel) => {
    await createMutation.mutateAsync(value);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Carousel">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="name" {...form.getInputProps("name")} />
          <Button type="submit" mt="sm">
            Create Carousel
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Create Carousel</Button>
      </Group>
    </>
  );
};
