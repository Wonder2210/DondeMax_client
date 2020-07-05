import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { Link } from "../../atoms/Links";

const Navbar = () => {
  return (
    <Box position="absolute" display="flex" width="90%" height="16px" top="0" backgroundColor="blue">
      <Flex justify="space-between" flexDirection="row" position="absolute" left="0" width="40%">
        <Link href="/">Acerca de Nosotros </Link>
        <Link href="/">Noticias</Link>
        <Link href="/">Productos</Link>
      </Flex>

      <Flex position="absolute" right="0" flexDirection="row" width="40%" justify="flex-end">
        <Flex justify="flex-end" w="50%">
          <Link href="/">Acerca de Nosotros </Link>
        </Flex>
        <Flex justify="flex-end" w="20%">
          <Link href="/">Noticias</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
