import React from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import MenuIcon from "@iconify/icons-cil/hamburger-menu";
import { ListItem } from "../../atoms/List";
import { Dropdown, UserDropdown, LanguageDropDown } from "../../molecules/Dropdown";
import { IconButton } from "../../atoms/Buttons";
import { CartList } from "../CartList";
import Languages from "../../../locales";

const NavbarMobile: React.FC<{ lang: string }> = ({ lang }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const t = Languages(lang);

  return (
    <Box
      zIndex={1}
      position="absolute"
      backgroundColor="rgba(0,0,0,0.5)"
      top="0"
      right="0"
      h={isOpen ? "100vh" : "7vh"}
      w="100%"
    >
      <Flex
        position="relative"
        bg="white"
        zIndex={2}
        align="center"
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
          backgroundColor="transparent"
          onClick={isOpen ? onClose : onOpen}
          icon={<Icon icon={MenuIcon} width="90%" height="90%" />}
        />
        <LanguageDropDown />
      </Flex>
      <Dropdown show={isOpen}>
        <ListItem marginLeft={3}>
          <Link href="/">{t.navbar.home}</Link>
        </ListItem>
        <ListItem marginLeft={3}>
          <Link href="/info">{t.navbar.aboutUs}</Link>
        </ListItem>

        <ListItem marginLeft={3}>
          <Link href="/compra" passHref>
            {t.navbar.shop}
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
