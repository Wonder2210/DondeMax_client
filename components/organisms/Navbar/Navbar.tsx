import React from "react";
import { Box } from "@chakra-ui/core";
import { useMediaQuery } from "react-responsive";
import NavbarWideScreen from "./NavbarWideScreens";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const isTabletOrPc = useMediaQuery({
    minDeviceWidth: 768,
  });
  const isMobile = useMediaQuery({
    maxDeviceWidth: 768,
  });

  return (
    <Box w="100%" height="min-content" top="0" position="absolute">
      {isTabletOrPc && <NavbarWideScreen />}
      {isMobile && <NavbarMobile />}
    </Box>
  );
};

export default Navbar;
