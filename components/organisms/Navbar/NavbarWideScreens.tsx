import React from "react";
import { Flex } from "@chakra-ui/core";
import Link from "next/link";
import { Link as StyleLink } from "../../atoms/Links";
import { ShoppingCart } from "../../atoms/Buttons";

const NavbarWideScreen = () => {
  return (
    <Flex zIndex={1} position="absolute" justifyContent="space-between" flexDirection="row" width="100%" height="72px">
      <Flex justify="space-evenly" marginTop="4vh" flexDirection="row" left="0" width="50%">
        <Link href="/about">
          <a>
            <StyleLink>Acerca de Nosotros </StyleLink>
          </a>
        </Link>
        <Link href="/" passHref>
          <a>
            <StyleLink href="/">Noticias</StyleLink>
          </a>
        </Link>
        <Link href="/" passHref>
          <a>
            <StyleLink href="/">Pedidos</StyleLink>
          </a>
        </Link>
      </Flex>

      <Flex marginRight="1em" position="relative" marginTop="1em" flexDirection="row" w="20%" justify="flex-end">
        <ShoppingCart itemsCount={0} />
      </Flex>
    </Flex>
  );
};

export default NavbarWideScreen;
