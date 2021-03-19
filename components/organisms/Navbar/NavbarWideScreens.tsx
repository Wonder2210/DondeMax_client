/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { CartList } from "../CartList";
import { UserDropdown, LanguageDropDown } from "../../molecules/Dropdown";
import Languages from "../../../locales";

const StyledLink: React.FC<{ href: string }> = ({ href, children }) => (
  <Link href={href}>
    <a style={{ fontSize: "1.12em", fontWeight: 400, color: "#333" }}>{children}</a>
  </Link>
);

const NavbarWideScreen: React.FC<{ lang: string }> = ({ lang }) => {
  const t = Languages(lang);
  return (
    <Flex zIndex={1} position="absolute" justifyContent="space-between" flexDirection="row" width="100%" height="72px">
      <Flex justify="space-evenly" marginTop="4vh" flexDirection="row" left="0" width="50%">
        <StyledLink href="/">{t.navbar.home}</StyledLink>
        <StyledLink href="/info">{t.navbar.aboutUs}</StyledLink>

        <StyledLink href="/compra">{t.navbar.shop}</StyledLink>
      </Flex>

      <Flex
        marginRight="1em"
        position="relative"
        marginTop="1em"
        flexDirection="row"
        w="max-content"
        justify="flex-end"
      >
        <LanguageDropDown />
        <CartList lang={lang} />
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="Jhon Doe" userName="Jhon Doe" />
      </Flex>
    </Flex>
  );
};

export default NavbarWideScreen;
