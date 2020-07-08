import React from "react";
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
    <>
      {isTabletOrPc && <NavbarWideScreen />}
      {isMobile && <NavbarMobile />}
    </>
  );
};

export default Navbar;
