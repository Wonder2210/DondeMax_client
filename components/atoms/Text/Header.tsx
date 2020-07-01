import * as React from "react";
import { Text } from "@chakra-ui/core";

const Header: React.FC<{ color: string }> = ({ children, color }) => (
  <Text size={["56px", "76px", "96px"]} color={color && "white"}>
    {children}
  </Text>
);
export default Header;
