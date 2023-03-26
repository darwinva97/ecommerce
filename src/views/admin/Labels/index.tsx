import { Box, Button, Group, Table, Title } from "@mantine/core";
import { api } from "@/utils/api";
import { BtnCreateLabel } from "./BtnCreateLabel";

export const AdminLabelsView = () => {
  const { data: labels } = api.label.getAll.useQuery();

  const rows = (labels || []).map((label, index) => (
    <tr key={label.id}>
      <td>{index + 1}</td>
      <td>{label.name}</td>
      <td
        style={{ background: label.color, color: "white", fontWeight: "bold" }}
      >
        {label.color}
      </td>
      <td>
        <Button mr="sm">Edit</Button>
        <Button color={"red"}>Delete</Button>
      </td>
    </tr>
  ));

  return (
    <Box>
      <Group>
        <Title>Labels</Title>
        <BtnCreateLabel />
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};
