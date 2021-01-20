import * as React from "react";
import { Heading, HeadingProps } from "@chakra-ui/core";

type props = {
  color?: string;
  fontSize?: string | Array<string>;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  weight?: "bold" | "semibold";
};

const Header: React.FC<props & HeadingProps> = ({
  children,
  color,
  type = "h1",
  weight = "bold",
  fontSize,
  ...props
}) => (
  <Heading
    as={type}
    textAlign="center"
    fontWeight={weight}
    // fontSize={fontSize ?? ["3.5rem", "4.75rem", "6rem", "6rem"]}
    color={color ?? "black"}
    display="contents"
    {...props}
  >
    {children}
  </Heading>
);
export default Header;
