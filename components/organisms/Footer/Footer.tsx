import React from "react";
import { useMediaQuery } from "react-responsive";
import { Flex, Heading } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Instagram from "@iconify/icons-cib/instagram";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Link from "next/link";
import { Header } from "../../atoms/Text";
import { List, ListItem } from "../../atoms/List";

const Footer = () => {
  const isMobile = useMediaQuery({
    maxDeviceWidth: 768,
  });
  return (
    <>
      <style jsx>{`
        a {
          color: white;

          transition: color 275ms ease;
        }
        a:hover {
          color: #e91e63;
        }
      `}</style>
      <Flex
        w="100%"
        direction={isMobile ? "column" : "row"}
        backgroundColor="#3B3E4A"
        justify="space-evenly"
        padding="3em"
        position="relative"
        bottom="0"
      >
        <Flex justify="center" flexDirection="column" align="center">
          <Header fontSize="3.5em" color="colors.rose.600">
            D
          </Header>
          <Header fontSize="3.5em" color="#FFF">
            onde
          </Header>
          <Header fontSize="3.5em" color="colors.rose.600">
            M
          </Header>
          <Header fontSize="3.5em" color="#FFF">
            ax
          </Header>
        </Flex>
        <List width="auto" spacing={3}>
          <Heading color="white" fontSize="xl">
            Sitio:
          </Heading>
          <ListItem marginLeft={3}>
            <Link href="/about">
              <a>Acerca de Nosotros</a>
            </Link>
          </ListItem>
          <ListItem marginLeft={3}>
            <Link href="/about">
              <a>Pedidos</a>
            </Link>
          </ListItem>

          <ListItem marginLeft={3} color="white">
            <Link href="/store">
              <a>Tienda</a>
            </Link>
          </ListItem>
        </List>
        <Flex flexDirection="column" w="9em">
          <Heading color="white" fontSize="xl">
            Contactanos:
          </Heading>
          <List width="auto" spacing={3}>
            <ListItem>
              <a href="">
                <Icon
                  style={{
                    display: "inline",
                    margin: "0.2em",
                  }}
                  icon={Instagram}
                  color="#FFF"
                  width="1.5em"
                  height="1.5em"
                />
                Instagram
              </a>
            </ListItem>
            <ListItem>
              <a href="">
                <Icon
                  style={{
                    display: "inline",
                    margin: "0.2em",
                  }}
                  icon={Whatsapp}
                  color="#FFF"
                  width="1.5em"
                  height="1.5em"
                />
                Whatsapp
              </a>
            </ListItem>
          </List>
        </Flex>
      </Flex>
    </>
  );
};

export default Footer;
