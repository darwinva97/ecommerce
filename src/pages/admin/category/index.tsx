import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";
import { AdminCategoriesView } from "@/views/admin/Categories";

const AdminCategoryPage: CustomPageComponent = () => {
  return <AdminCategoriesView />
};

AdminCategoryPage.getLayout = AdminLayout;

export default AdminCategoryPage;
