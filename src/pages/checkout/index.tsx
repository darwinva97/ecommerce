import { ClientLayout } from "@/components/layouts/Client";
import type { CustomPageComponent } from "@/pages/_app";

const CheckoutPage: CustomPageComponent = () => {
  return <div>CheckoutPage</div>;
};

CheckoutPage.getLayout = ClientLayout;

export default CheckoutPage;
