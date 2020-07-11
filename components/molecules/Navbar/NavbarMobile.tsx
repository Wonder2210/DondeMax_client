import React from "react";
import { Box } from "@chakra-ui/core";
import Link from "next/link";
import { Icon } from "@iconify/react";
import MenuIcon from "@iconify/icons-cil/hamburger-menu";
import { Link as StyleLink } from "../../atoms/Links";
import { ListItem } from "../../atoms/List";
import { Dropdown } from "../Dropdown";
import { IconButton } from "../../atoms/Buttons";

const { useState } = React;

const NavbarMobile = () => {
  const [state, setState] = useState({
    height: "7vh",
    open: false,
  });

  const openDropDown = () => {
    if (state.open) {
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
    if (!state.open) {
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
    }
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
          icon={() => <Icon icon={MenuIcon} width="90%" height="90%" />}
        />
      </Box>
      <Dropdown show={state.open}>
        <ListItem marginLeft={3}>
          <Link href="/" passHref>
            <StyleLink fontSize="xl">Acerca de Nosotros </StyleLink>
          </Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/" passHref>
            <StyleLink fontSize="xl">Noticias</StyleLink>
          </Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/" passHref>
            <StyleLink fontSize="xl">Pedidos</StyleLink>
          </Link>
        </ListItem>
      </Dropdown>
    </Box>
  );
};

export default NavbarMobile;
