import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/core";
import NavbarWideScreen from "./NavbarWideScreens";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");
  const [isLessThan768] = useMediaQuery("(max-width:768px)");

  return (
    <Box w="100%" height="min-content" top="0" position="absolute">
      {isLargerThan768 && <NavbarWideScreen />}
      {isLessThan768 && <NavbarMobile />}
    </Box>
  );
};

export default Navbar;
