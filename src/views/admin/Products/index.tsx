import { Box, Button, Group, Table, Title } from "@mantine/core";
import { api } from "@/utils/api";
import { BtnCreateModal } from "./BtnCreateModal";
import { useRouter } from "next/router";

export const AdminProductsView = () => {
  const { data: products } = api.product.getAll.useQuery();
  const router = useRouter();
  const rows = (products || []).map((product, index) => (
    <tr key={product.id}>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.categories.map(cat => cat.name).join(", ")}</td>
      <td>{product.labels.map(l => l.name).join(", ")}</td>
      <td>{product.variants.map(v => v.name).join(", ")}</td>
      <td>{product.variants.reduce((sum, v) => sum+v.stock, 0)}</td>
      <td>
        <Button
          mr="sm"
          onClick={() => void router.push("/admin/product/" + product.id)}
        >
          Edit
        </Button>
        <Button color={"red"}>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <Box>
      <Group>
        <Title>Products</Title>
        <BtnCreateModal />
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Name</th>
            <th>Categories</th>
            <th>Labels</th>
            <th>Variants</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};
