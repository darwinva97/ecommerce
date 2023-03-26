import { AdminLayout } from "@/components/layouts/Admin";
import type { CustomPageComponent } from "@/pages/_app";

const DashboardPage: CustomPageComponent = () => {
  return (
    <div>DashboardPage</div>
  )
}
DashboardPage.getLayout = AdminLayout;

export default DashboardPage