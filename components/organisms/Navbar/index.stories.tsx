import React from "react";
import NavbarW from "./NavbarWideScreens";
import NavbarM from "./NavbarMobile";
import Navbar from "./Navbar";
import NavbarDashboard from "./NavbarDashboard";

export const TestNavbarWide = () => {
  return <NavbarW />;
};

export const NavbarMobileTest = () => {
  return <NavbarM />;
};

export const NavbarFull = () => {
  return <Navbar />;
};

export const NavbarDashboardTest = () => {
  return <NavbarDashboard toggle={(e) => alert("here")} />;
};

export default {
  title: "Organism/Navbar",
};
