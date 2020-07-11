import * as React from "react";
import { Heading } from "@chakra-ui/core";

const Header: React.FC<{ color?: string }> = ({ children, color }) => (
  <Heading fontSize={["3.5rem", "4.75rem", "6rem", "6rem"]} color={color ?? "black"}>
    {children}
  </Heading>
);
export default Header;
