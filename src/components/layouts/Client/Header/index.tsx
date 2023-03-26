/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import Link from "next/link";
import Image from "next/image";
import {
  Title,
  Header as MantineHeader,
  Group,
  Input,
  ActionIcon,
  Box,
  Button,
} from "@mantine/core";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";
import { useState, type RefAttributes } from "react";
import { sign } from "crypto";
import { signIn } from "next-auth/react";
import { BtnAccount } from "@/components/BtnAccount";

export const Links = ({
  setShowSearch,
  showSearch,
  setOpenCart,
  openCart,
  ...props
}: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const finalProps: RefAttributes<HTMLAnchorElement> = {
    ...props,
    style: {
      textTransform: "uppercase",
      fontSize: ".9em",
      letterSpacing: ".15em",
    },
  };
  return (
    <Group>
      <Link href="/category/woman" {...finalProps}>
        Mujer
      </Link>
      <Link href="/category/man" {...finalProps}>
        Hombre
      </Link>

      <ActionIcon
        variant="transparent"
        color={"blue"}
        onClick={() => setShowSearch(!showSearch)}
      >
        <IconSearch size={24} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        color={"blue"}
        onClick={() => setOpenCart(!openCart)}
      >
        <IconShoppingCart size={24} />
      </ActionIcon>

      <BtnAccount />
    </Group>
  );
};

export const Header = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  return (
    <MantineHeader height={showSearch ? 110 : 70} p="md">
      <Group position="apart">
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: ".5em" }}
        >
          <Image
            src="https://picsum.photos/128/128"
            width={32}
            height={32}
            alt="I Hear You"
          />
          <Title size="h4">Barato</Title>
        </Link>

        <Links
          openCart={openCart}
          setOpenCart={setOpenCart}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />
      </Group>
      <Box p="md">
        {showSearch && (
          <Input
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
          />
        )}
      </Box>
    </MantineHeader>
  );
};
