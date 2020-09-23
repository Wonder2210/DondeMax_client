import React from "react";
import { useMediaQuery } from "react-responsive";
import { Flex } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Instagram from "@iconify/icons-cib/instagram";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Link from "next/link";
import { Header } from "../../atoms/Text";
import { List, ListItem } from "../../atoms/List";
import { Link as StyleLink } from "../../atoms/Links";

const Footer = () => {
  const isMobile = useMediaQuery({
    maxDeviceWidth: 768,
  });
  return (
    <Flex
      w="100%"
      direction={isMobile ? "column" : "row"}
      backgroundColor="#3B3E4A"
      justify="space-evenly"
      padding="3em"
      position="relative"
      bottom="0"
    >
      <Flex justify="center" align="center">
        <Header fontSize="3.5em" color="#FFF">
          DondeMax
        </Header>
      </Flex>
      <List width="auto" spacing={3}>
        <ListItem marginLeft={3}>
          <Link href="/about">
            <a>
              <StyleLink _hover={{ color: "rose.600", transform: "scale(1.1)" }} color="white" fontSize="xl2">
                Acerca de Nosotros
              </StyleLink>
            </a>
          </Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/" passHref>
            <a>
              <StyleLink _hover={{ color: "rose.600", transform: "scale(1.1)" }} color="white" fontSize="xl2">
                Noticias
              </StyleLink>
            </a>
          </Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/" passHref>
            <a>
              <StyleLink _hover={{ color: "rose.600", transform: "scale(1.1)" }} color="white" fontSize="xl2">
                Pedidos
              </StyleLink>
            </a>
          </Link>
        </ListItem>
      </List>
      <Flex direction="row" w="8em" justifyContent="space-between">
        <StyleLink href="/">
          <Icon icon={Instagram} color="#FFF" width="3em" height="3em" />
        </StyleLink>

        <StyleLink href="/">
          <Icon icon={Whatsapp} color="#FFF" width="3em" height="3em" />
        </StyleLink>
      </Flex>
    </Flex>
  );
};

export default Footer;
