import React from "react";
import NavbarW from "./NavbarWideScreens";
import NavbarM from "./NavbarMobile";
import Navbar from "./Navbar";

export const TestNavbarWide = () => {
  return <NavbarW />;
};

export const NavbarMobileTest = () => {
  return <NavbarM />;
};

export const NavbarFull = () => {
  return <Navbar />;
};

export default {
  title: "Molecules/Navbar",
};
