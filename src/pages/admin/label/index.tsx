import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";
import { AdminLabelsView } from "@/views/admin/Labels";

const AdminLabelsPage: CustomPageComponent = () => {
  return <AdminLabelsView />
};

AdminLabelsPage.getLayout = AdminLayout;

export default AdminLabelsPage;
