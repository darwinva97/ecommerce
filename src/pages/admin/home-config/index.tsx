import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";
import { HomeConfig } from "@/views/admin/HomeConfig";

const AdminHomeConfigPage: CustomPageComponent = () => {
  return (
    <HomeConfig />
  )
};

AdminHomeConfigPage.getLayout = AdminLayout;

export default AdminHomeConfigPage;
