import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";

const AdminOrdersPage: CustomPageComponent = () => {
  return <div>AdminOrdersPage</div>;
};

AdminOrdersPage.getLayout = AdminLayout;

export default AdminOrdersPage;
