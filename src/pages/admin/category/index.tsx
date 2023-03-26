import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";

const AdminCategoryPage: CustomPageComponent = () => {
  return <div>Category</div>;
};

AdminCategoryPage.getLayout = AdminLayout;

export default AdminCategoryPage;
