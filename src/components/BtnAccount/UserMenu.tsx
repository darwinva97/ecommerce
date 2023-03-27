import {
  Menu,
  Button,
  ActionIcon,
  useMantineColorScheme,
  Group,
  Text,
} from "@mantine/core";
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
        <Button>{sessionData?.user.name?.split(" ")[0]}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconSettings size={14} />}
          onClick={() =>
            void router.push(
              sessionData?.user?.role === "Admin"
                ? "/admin/account"
                : "/account"
            )
          }
        >
          Account
        </Menu.Item>

        {sessionData?.user?.role === "Admin" && (
          <Menu.Item
            icon={<IconSettings size={14} />}
            onClick={() => void router.push("/admin")}
          >
            Admin
          </Menu.Item>
        )}

        <Menu.Item onClick={() => toggleColorScheme()}>
          <Group>
            <Text>Theme</Text>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Group>
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
