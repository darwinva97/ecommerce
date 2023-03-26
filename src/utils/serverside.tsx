// const layoutUno = (page: React.ReactNode) => (
//     <div>
//         <div>Header</div>
//         <div>{page}</div>
//     </div>
// );
// const layoutDos = (page: React.ReactNode) => (
//     <div>
//         <div>Header 2</div>
//         <div>{page}</div>
//     </div>
// );
// const layoutTres = (page: React.ReactNode) => (
//     <div>
//         <div>Header 2</div>
//         <div>{page}</div>
//     </div>
// );

import { getServerAuthSession } from "@/server/auth";
import type { GetServerSidePropsContext } from "next";

// export const ClientLayout = nestLayout(layoutUno, layoutDos);

// export const AdminLayout = nestLayout(ClientLayout, layoutTres);

// MyPage.getLayout = ClientLayout;

export const requireClientSession = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

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

export const x = 2;
