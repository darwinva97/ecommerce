import { Box, Button, Group, Table, Title } from "@mantine/core";
import { api } from "@/utils/api";
import { BtnCreateCategory } from "./BtnCreateCategory";

export const AdminCategoriesView = () => {
  const { data: categories } = api.category.getAll.useQuery();
  
  const rows = (categories || []).map((category, index) => (
    <tr key={category.id}>
      <td>{index + 1}</td>
      <td>{category.name}</td>
      <td>
        <Button mr="sm">Edit</Button>
        <Button color={"red"}>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <Box>
      <Group>
        <Title>Categories</Title>
        <BtnCreateCategory />
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};
