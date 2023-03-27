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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sessionProps = JSON.parse(JSON.stringify(session));

  if (!sessionProps) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sessionProps: sessionProps,
    },
  };
};

export const x = 2;
