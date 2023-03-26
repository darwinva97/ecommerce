import { Menu, Button, ActionIcon, useMantineColorScheme } from "@mantine/core";
import {
  IconMoonStars,
  IconSettings,
  IconSun,
  IconTrash,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const UserMenu = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>{sessionData?.user.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconSettings size={14} />}
          onClick={() => void router.push("/account")}
        >
          Account
        </Menu.Item>

        {sessionData && (
          <Menu.Item
            icon={<IconSettings size={14} />}
            onClick={() => void router.push("/admin")}
          >
            Admin
          </Menu.Item>
        )}

        <Menu.Item
          icon={<IconSettings size={14} />}
          onClick={() => void router.push("/account")}
        >
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => void signOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
