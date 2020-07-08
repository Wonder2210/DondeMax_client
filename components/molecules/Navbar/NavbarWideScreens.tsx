import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import Link from "next/link";
import { Link as StyleLink } from "../../atoms/Links";
import { ShoppingCart } from "../../atoms/Buttons";

const Navbar = () => {
  return (
    <Box position="absolute" display="flex" width="100%" height="72px" top="0">
      <Flex justify="space-between" top="10%" flexDirection="row" position="absolute" left="0" width="40%">
        <Link href="/" passHref>
          <StyleLink>Acerca de Nosotros </StyleLink>
        </Link>
        <Link href="/" passHref>
          <StyleLink href="/">Noticias</StyleLink>
        </Link>
        <Link href="/" passHref>
          <StyleLink href="/">Pedidos</StyleLink>
        </Link>
      </Flex>

      <Flex position="absolute" right="0" flexDirection="row" width="40%" justify="flex-end">
        <Flex justify="flex-start" w="20%">
          <ShoppingCart itemsCount={0} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
