import * as React from "react";
import { Heading } from "@chakra-ui/core";

type props = { color?: string; fontSize?: string | Array<string> };

const Header: React.FC<props> = ({
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
