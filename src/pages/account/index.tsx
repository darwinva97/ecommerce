import { ClientLayout } from "@/components/layouts/Client";
import type { CustomPageComponent } from "@/pages/_app";
import { requireClientSession } from "@/utils/serverside";

const AccountPage: CustomPageComponent = () => {
  return <div>AccountPage</div>;
};

AccountPage.getLayout = ClientLayout;

export const getServerSideProps = requireClientSession;

export default AccountPage;
