/* eslint-disable no-unused-vars */
import React from "react";
import { Link, LinkProps } from "@chakra-ui/core";

const Links: React.FC<LinkProps> = React.forwardRef(
  ({ as, color, isExternal, mx, fontSize = ["md", "md", "1.125rem"], children, href }, ref) => {
    return (
      <Link
        as={as}
        href={href}
        color={color}
        isExternal={isExternal}
        textDecoration="none"
        fontSize={fontSize}
        mx={mx}
        ref={ref}
      >
        {children}
      </Link>
    );
  },
);
export default Links;
