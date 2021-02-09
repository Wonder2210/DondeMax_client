/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Flex, Divider } from "@chakra-ui/core";
import Link from "next/link";
import { CartList } from "../CartList";
import { UserDropdown } from "../../molecules/Dropdown";

const NavbarWideScreen = () => {
  return (
    <Flex zIndex={1} position="absolute" justifyContent="space-between" flexDirection="row" width="100%" height="72px">
      <Flex justify="space-evenly" marginTop="4vh" flexDirection="row" left="0" width="50%">
        <style jsx>
          {`
            .link {
              font-size: 1.12em;
              font-weight: 400;
              color: #333;
            }
          `}
        </style>
        <Link href="/">
          <a className="link"> Inicio</a>
        </Link>
        <Link href="/info">
          <a href="" className="link">
            Acerca de Nosotros
          </a>
        </Link>

        <Link href="/products" passHref>
          <a className="link">Productos</a>
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
