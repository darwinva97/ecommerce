import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type TUpdateVariant } from "@/types/variant";
import { api } from "@/utils/api";
import { type ProductVariant } from "@prisma/client";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const Form = ({ variant }: { variant: ProductVariant }) => {
  const updateMutation = api.variant.update.useMutation();

  const form = useForm<TUpdateVariant>({
    initialValues: variant,
  });

  const onSubmit = async (value: TUpdateVariant) => {
    await updateMutation.mutateAsync(value);
    close();
  };
  return (
    <form onSubmit={form.onSubmit((data) => void onSubmit(data))}>
      <TextInput label="Name" {...form.getInputProps("name")} />
      <TextInput label="Description" {...form.getInputProps("description")} />
      <TextInput label="Image" {...form.getInputProps("image")} />
      <TextInput label="Stock" {...form.getInputProps("stock")} />
      <TextInput label="Price" {...form.getInputProps("price")} />
      <TextInput label="Offer Price" {...form.getInputProps("offer_price")} />
      <TextInput
        label="Texto de oferta"
        {...form.getInputProps("offer_message")}
      />

      <Button type="submit" mt="sm">
        Update Variant
      </Button>
    </form>
  );
};

export const BtnUpdateVariant = ({ id }: { id: string }) => {
  const { data: variant } = api.variant.getDetail.useQuery({ id });
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Variant">
        {variant && <Form variant={variant} />}
      </Modal>

      <Group position="center">
        <ActionIcon color="blue" variant="filled" onClick={open}>
          <IconEdit size="1rem" />
        </ActionIcon>
        <ActionIcon color="red" variant="filled" onClick={open}>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    </>
  );
};
