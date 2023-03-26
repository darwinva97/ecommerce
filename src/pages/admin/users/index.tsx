import { AdminLayout } from "@/components/layouts/Admin";
import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps } from "next";
import type { CustomPageComponent } from "@/pages/_app";

const AdminUsersPage: CustomPageComponent = () => {
  return <div>AdminUsersPage</div>;
};

AdminUsersPage.getLayout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default AdminUsersPage;
