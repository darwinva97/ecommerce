import type { TUpdateCarouselItem } from "@/types/carousel";
import { api } from "@/utils/api";
import {
  Title,
  Divider,
  Group,
  Box,
  TextInput,
  Button,
  Textarea,
  Tabs,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { CarouselItem } from "@prisma/client";
import Image from "next/image";
import { BtnCreateCarousel } from "./BtnCreateCarousel";
import { BtnCreateCarouselItem } from "./BtnCreateCarouselItem";

const Form = (props: TUpdateCarouselItem) => {
  const updateMutation = api.carousel.updateItem.useMutation();

  const form = useForm<TUpdateCarouselItem>({
    initialValues: { ...props },
  });

  const onSubmit = async (value: TUpdateCarouselItem) => {
    const result = await updateMutation.mutateAsync(value);
    form.setValues(result as TUpdateCarouselItem);
  };

  return (
    <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
      <TextInput label="URL" {...form.getInputProps("url")} />
      <TextInput label="image" {...form.getInputProps("image")} />
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
        Update Item
      </Button>
    </form>
  );
};

const Items = ({ items }: { items: CarouselItem[] }) => {
  console.log(items);
  return (
    <Tabs defaultValue={String(items[0]?.name)}>
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Tab value={item.name} key={item.id}>
            {item.name}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {items.map((item) => (
        <Tabs.Panel value={item.name} key={item.id} pt="xs">
          <Form {...(item as TUpdateCarouselItem)} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export const HomeConfig = () => {
  const { data: carousels } = api.carousel.getAll.useQuery();
  console.log(carousels);
  return (
    <Box>
      <Title>Home Config</Title>
      <Divider my="md" />
      <Group my="md">
        <Title order={2}>Carousels</Title>
        <BtnCreateCarousel />
      </Group>
      {(carousels || [])?.map(({ id, name, items }) => (
        <Box key={id}>
          <Group>
            <Title order={3}>{name}</Title>
            <BtnCreateCarouselItem carouselId={id} />
          </Group>
          <Items items={items} />
        </Box>
      ))}
    </Box>
  );
};
