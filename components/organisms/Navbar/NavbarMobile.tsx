import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import Link from "next/link";
import { Icon } from "@iconify/react";
import MenuIcon from "@iconify/icons-cil/hamburger-menu";
import { ListItem } from "../../atoms/List";
import { Dropdown, UserDropdown } from "../../molecules/Dropdown";
import { IconButton } from "../../atoms/Buttons";
import { CartList } from "../CartList";

const { useState } = React;

const NavbarMobile = () => {
  const [state, setState] = useState({
    height: "7vh",
    open: false,
  });

  const openDropDown = () => {
    return state.open
      ? () => {
          setState({
            height: state.height,
            open: false,
          });
          setTimeout(() => {
            setState(() => ({
              height: "7vh",
              open: false,
            }));
          }, 500);
        }
      : () => {
          setState({
            height: "100vh",
            open: false,
          });
          setTimeout(() => {
            setState({
              height: "100vh",
              open: true,
            });
          }, 400);
        };
  };

  return (
    <Box zIndex={1} position="absolute" backgroundColor="rgba(0,0,0,0.5)" top="0" right="0" h={state.height} w="100%">
      <Box
        position="relative"
        bg="white"
        display="flex"
        zIndex={2}
        flexDirection="row-reverse"
        w="100%"
        height="7vh"
        top="0"
      >
        <IconButton
          aria-label="Menu icon"
          width="10%"
          height="70%"
          margin={3}
          onClick={openDropDown}
          icon={<Icon icon={MenuIcon} width="90%" height="90%" />}
        />
      </Box>
      <Dropdown show={state.open}>
        <ListItem marginLeft={3}>
          <Link href="/info">Acerca de Nosotros</Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/products" passHref>
            Productos
          </Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/store" passHref>
            Pedidos
          </Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Flex alignItems="center" justifyContent="space-between">
            <UserDropdown />
            <CartList />
          </Flex>
        </ListItem>
      </Dropdown>
    </Box>
  );
};

export default NavbarMobile;
