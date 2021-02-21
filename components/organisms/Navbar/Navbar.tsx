import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavbarWideScreen from "./NavbarWideScreens";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");
  const [isLessThan768] = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const { locale } = router;

  return (
    <Box w="100%" height="min-content" top="0" position="absolute">
      {isLargerThan768 && <NavbarWideScreen lang={locale} />}
      {isLessThan768 && <NavbarMobile lang={locale} />}
    </Box>
  );
};

export default Navbar;
