import * as React from "react";
import { Heading } from "@chakra-ui/core";

const Header: React.FC<{ color?: string }> = ({ children, color }) => (
  <Heading fontSize={["56px", "76px", "96px", "96px"]} color={color ?? "black"}>
    {children}
  </Heading>
);
export default Header;
