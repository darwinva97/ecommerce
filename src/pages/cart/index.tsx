import { ClientLayout } from "@/components/layouts/Client";
import type { CustomPageComponent } from "@/pages/_app";

const CartPage: CustomPageComponent = () => {
  return <div>CartPage</div>;
};

CartPage.getLayout = ClientLayout;

export default CartPage;
