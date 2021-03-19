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
  const [date, setDate] = React.useState(new Date());
  function tick() {
    setDate(new Date());
  }
  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  const hour = date.getHours();
  const minutes = date.getMinutes();
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
        <Icon icon={Home} width="2em" height="2em" />
      </Link>
      <Parragraph width="13em" height="min-content" fontSize="2em" fontWeight="600">
        Hola {userauth.name ?? "loading"}
      </Parragraph>

      <Flex flexGrow={1} align="center" justify="flex-end" justifySelf="flex-end" bgColor="#FFF">
        <Parragraph width="13em" height="min-content">
          {hour < 12 ? hour : hour - 12}&#58;{minutes < 10 ? `0${minutes}` : minutes} {hour >= 12 ? "PM" : "AM"}
        </Parragraph>
        <Divider borderColor="#222" orientation="vertical" height="3em" />
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="User" userName="User" />
      </Flex>
    </Flex>
  );
};

export default NavbarClient;
