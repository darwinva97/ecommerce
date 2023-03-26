import { AdminLayout } from "@/components/layouts/Admin";
import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import type { CustomPageComponent } from "../_app";

const AdminPage: CustomPageComponent = () => {
  return <div>AdminPage</div>;
};

AdminPage.getLayout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = (await getServerAuthSession(context)) as Session;

  if (session?.user?.role && session?.user?.role === "Client") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/dashboard",
      permanent: false,
    },
  };
};

export default AdminPage;
