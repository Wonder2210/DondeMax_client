import * as React from "react";
import { Flex, Divider } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import menuIcon from "@iconify/icons-cil/hamburger-menu";
import { IconButton } from "../../atoms/Buttons";
import { Parragraph } from "../../atoms/Text";
import { UserDropdown } from "../../molecules/Dropdown";

type props = {
  toggle: (e: React.FormEvent) => void;
};

const NavbarDashboard = ({ toggle }) => {
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
      paddingX="1em"
      alignItems="center"
      position="sticky"
      zIndex="1"
      top={0}
      backgroundColor="white"
    >
      <IconButton
        aria-label="toggle"
        backgroundColor="transparent"
        color="white"
        icon={<Icon icon={menuIcon} color="#000" height="100%" />}
        onClick={toggle}
      />
      <Flex flexGrow={1} align="center" justify="flex-end" justifySelf="flex-end" bgColor="#FFF">
        <Parragraph width="13em" height="min-content">
          {hour < 12 ? hour : hour - 12}&#58;{minutes < 10 ? `0${minutes}` : minutes} {hour >= 12 ? "PM" : "AM"}
        </Parragraph>
        <Divider borderColor="#222" orientation="vertical" height="3em" />
        <div>
          <UserDropdown />
        </div>
      </Flex>
    </Flex>
  );
};

export default NavbarDashboard;
