import * as React from "react";
import Link from "next/link";
import { Flex, Divider } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Home from "@iconify/icons-cil/home";
import { Parragraph } from "../../atoms/Text";
import { UserDropdown } from "../../molecules/Dropdown";
import { useAuth } from "../../../utils/AuthHook";

const NavbarClient: React.FC = () => {
  const { customer: userauth } = useAuth();
  return (
    <Flex
      width="100%"
      height="4em"
      paddingX="1.5em"
      alignItems="center"
      position="sticky"
      zIndex="3"
      top={0}
      backgroundColor="white"
    >
      <Link href="/">
        <Icon icon={Home} width="2.4em" height="2.4em" />
      </Link>

      <Flex flexGrow={1} align="center" justify="flex-end" justifySelf="flex-end" bgColor="#FFF">
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="User" userName="User" />
      </Flex>
    </Flex>
  );
};

export default NavbarClient;
