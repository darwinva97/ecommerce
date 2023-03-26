import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TCreateVariant } from "@/types/variant";
import { api } from "@/utils/api";

const initialValues = {
  name: "",
  description: "",
  image: "",
  stock: 1,
  price: 10,
  offer_price: 10,
  offer_message: "",
};

export const BtnCreateVariant = ({ productId }: { productId: string }) => {
  const createMutation = api.variant.create.useMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<TCreateVariant>({
    initialValues: { ...initialValues, productId },
  });

  const onSubmit = async (value: TCreateVariant) => {
    console.log(value);
    await createMutation.mutateAsync(value);
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Variant">
        <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput
            label="Description"
            {...form.getInputProps("description")}
          />
          <TextInput label="Image" {...form.getInputProps("image")} />
          <NumberInput label="Stock" {...form.getInputProps("stock")} />
          <NumberInput label="Price" {...form.getInputProps("price")} />
          <NumberInput
            label="Offer Price"
            {...form.getInputProps("offer_price")}
          />
          <TextInput
            label="Texto de oferta"
            {...form.getInputProps("offer_message")}
          />

          <Button type="submit" mt="sm">
            Create Variant
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Create Variant</Button>
      </Group>
    </>
  );
};
