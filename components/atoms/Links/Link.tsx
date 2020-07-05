import React from "react";
import { Link, LinkProps } from "@chakra-ui/core";

const Links: React.FC<LinkProps> = ({ as, color, isExternal, mx, children, href }) => {
  return (
    <Link as={as} href={href} color={color} isExternal={isExternal} textDecoration="none" mx={mx}>
      {children}
    </Link>
  );
};
export default Links;
