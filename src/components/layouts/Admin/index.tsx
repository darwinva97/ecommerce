import { useState } from "react";
import type { ReactNode } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Button,
  ScrollArea,
  NavLink,
} from "@mantine/core";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { BtnAccount } from "@/components/BtnAccount";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme } = useMantineColorScheme();

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          px="sm"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200 }}
        >
          <Navbar.Section my={"sm"}>
            <NavLink
              href="/admin/product"
              label={"Products"}
              component={Link}
            />
          </Navbar.Section>
          <Navbar.Section my={"sm"}>
            <NavLink href="/admin/category" label={"Categories"} component={Link} />
          </Navbar.Section>
          <Navbar.Section my={"sm"}>
            <NavLink href="/admin/label" label={"Labels"} component={Link} />
          </Navbar.Section>
          <Navbar.Section my={"sm"}>
            <NavLink href="/admin/order" label={"Orders"} component={Link} />
          </Navbar.Section>
          <Navbar.Section my={"sm"}>
            <NavLink href="/admin/home-config" label={"Home"} component={Link} />
          </Navbar.Section>
          <Navbar.Section my={"sm"}>
            <NavLink href="/admin/users" label={"Users"} component={Link} />
          </Navbar.Section>

          {/* <Divider></Divider>
           */}
          <Navbar.Section grow component={ScrollArea} my="sm" mx="-xs" px="xs">
            {/* <NavLink href="/admin/dashboard" label={"Inicio"} component={Link} />
            <NavLink href="/admin/dashboard" label={"Inicio"} component={Link} />
            <NavLink href="/admin/dashboard" label={"Inicio"} component={Link} />
            <NavLink href="/admin/dashboard" label={"Inicio"} component={Link} /> */}
          </Navbar.Section>

          {/* 
           <Divider></Divider>
           */}
          <Navbar.Section>
            {/* <Button onClick={() => void signOut()}>Logout</Button> */}
            <NavLink href="/" label={"Back to Website"} component={Link} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group w="100%" position="apart">
              <Link href="/admin/dashboard">Dashboard</Link>
              <Group>
                <BtnAccount />
              </Group>
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
