import React from "react";
import { Flex, Divider } from "@chakra-ui/core";
import Link from "next/link";
import { CartList } from "../CartList";
import { UserDropdown } from "../../molecules/Dropdown";

const NavbarWideScreen = () => {
  return (
    <Flex zIndex={1} position="absolute" justifyContent="space-between" flexDirection="row" width="100%" height="72px">
      <Flex justify="space-evenly" marginTop="4vh" flexDirection="row" left="0" width="50%">
        <Link
          href="/info"
          css={{
            fontsize: "1.2em",
            fontWeight: 400,
          }}
        >
          Acerca de Nosotros
        </Link>
        <Link href="/products">Productos</Link>
        <Link href="/store" passHref>
          Pedidos
        </Link>
      </Flex>

      <Flex marginRight="1em" position="relative" marginTop="1em" flexDirection="row" w="20%" justify="flex-end">
        <CartList />
        <Divider borderColor="#222" orientation="vertical" height="3em" />
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="Jhon Doe" userName="Jhon Doe" />
      </Flex>
    </Flex>
  );
};

export default NavbarWideScreen;
