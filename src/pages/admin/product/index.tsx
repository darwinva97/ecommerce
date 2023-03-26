import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";
import { AdminProductsView } from "@/views/admin/Products";

const AdminProductsPage: CustomPageComponent = () => {
  return <AdminProductsView />;
};

AdminProductsPage.getLayout = AdminLayout;

export default AdminProductsPage;
