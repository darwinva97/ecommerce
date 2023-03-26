import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateCarouselItem } from "@/types/carousel";
import { api } from "@/utils/api";
import Image from "next/image";

export const BtnCreateCarouselItem = ({
  carouselId,
}: {
  carouselId: string;
}) => {
  const createMutation = api.carousel.createItem.useMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<TCreateCarouselItem>({
    initialValues: {
      name: "",
      url: "",
      image: "",
      html: "",
      carouselId,
    },
  });

  const onSubmit = async (value: TCreateCarouselItem) => {
    await createMutation.mutateAsync(value);
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Item">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput label="URL" {...form.getInputProps("url")} />
          <TextInput label="Image" {...form.getInputProps("image")} />
          <Image
            src={form.values.image}
            alt={"Imgen de Item del Carousel"}
            width={320}
            height={180}
          />
          <Textarea
            placeholder="HTML"
            label="HTML"
            {...form.getInputProps("html")}
          />
          <Button type="submit" mt="sm">
            Add Item
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Add Item</Button>
      </Group>
    </>
  );
};
