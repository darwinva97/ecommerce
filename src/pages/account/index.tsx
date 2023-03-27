import { ClientLayout } from "@/components/layouts/Client";
import type { CustomPageComponent } from "@/pages/_app";
import { requireClientSession } from "@/utils/serverside";
import { Center, Text, Title } from "@mantine/core";
import type { GetServerSideProps } from "next";
import type { Session } from "next-auth";

const AccountPage: CustomPageComponent = ({
  sessionProps,
}: {
  sessionProps: Session;
}) => {
  console.log(sessionProps);
  return (
    <Center sx={{flexDirection: "column", gap: "1em"}}>
      <Title align="center">Account</Title>
      <Text>
        {sessionProps.user.name} ({sessionProps.user.role})
      </Text>
      <Text>{sessionProps.user.email}</Text>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        referrerPolicy="no-referrer"
        src={sessionProps.user.image as string}
        alt={sessionProps.user.name as string}
      />
    </Center>
  );
};

AccountPage.getLayout = ClientLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await requireClientSession(ctx);
};

export default AccountPage;
