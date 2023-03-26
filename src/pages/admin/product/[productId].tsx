import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";
import { api } from "@/utils/api";
import { Box, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";

const AdminProductPage: CustomPageComponent = () => {
  const router = useRouter();
  const { data: product } = api.product.getDetail.useQuery({
    id: String(router.query.productId),
  });
  return (
    <Box>
      <Title>{product?.name}</Title>
      <Text>{product?.description}</Text>
    </Box>
  );
};

AdminProductPage.getLayout = AdminLayout;

export default AdminProductPage;
