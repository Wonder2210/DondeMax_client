import * as React from "react";
import { Heading } from "@chakra-ui/core";

const Header: React.FC<{ color?: string; fontSize?: string | Array<string> }> = ({
  children,
  color,

  fontSize,
}) => (
  <Heading
    as="h1"
    fontSize={fontSize ?? ["3.5rem", "4.75rem", "6rem", "6rem"]}
    color={color ?? "black"}
    display="contents"
  >
    {children}
  </Heading>
);
export default Header;
