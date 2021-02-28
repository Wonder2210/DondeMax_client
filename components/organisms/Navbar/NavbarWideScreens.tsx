/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { CartList } from "../CartList";
import { UserDropdown, LanguageDropDown } from "../../molecules/Dropdown";
import Languages from "../../../locales";

const NavbarWideScreen: React.FC<{ lang: string }> = ({ lang }) => {
  const t = Languages(lang);
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
          <a className="link">{t.navbar.home}</a>
        </Link>
        <Link href="/info">
          <a href="" className="link">
            {t.navbar.aboutUs}
          </a>
        </Link>

        <Link href="/compra" passHref>
          <a className="link">{t.navbar.shop}</a>
        </Link>
      </Flex>

      <Flex marginRight="1em" position="relative" marginTop="1em" flexDirection="row" w="20%" justify="flex-end">
        <LanguageDropDown />
        <CartList lang={lang} />
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="Jhon Doe" userName="Jhon Doe" />
      </Flex>
    </Flex>
  );
};

export default NavbarWideScreen;
