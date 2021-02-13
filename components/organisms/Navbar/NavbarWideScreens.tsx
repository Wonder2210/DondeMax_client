/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Flex, Divider } from "@chakra-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartList } from "../CartList";
import { UserDropdown } from "../../molecules/Dropdown";
import Languages from "../../../locales";

const NavbarWideScreen = () => {
  const router = useRouter();
  const { locale } = router;
  const t = Languages(locale);
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
        <CartList />
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="Jhon Doe" userName="Jhon Doe" />
      </Flex>
    </Flex>
  );
};

export default NavbarWideScreen;
