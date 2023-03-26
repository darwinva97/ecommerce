import { Button } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { UserMenu } from "./UserMenu";

export const BtnAccount = () => {
  const { data: sessionData } = useSession();

  return sessionData ? (
    <UserMenu />
  ) : (
    <Button onClick={() => void signIn("github")}>Login</Button>
  );
};
