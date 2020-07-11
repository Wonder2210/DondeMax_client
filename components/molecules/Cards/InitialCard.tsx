import React from "react";
import Link from "next/link";
import { Box } from "@chakra-ui/core";
import { BasicFooter, ImageHeader } from "../../atoms/CardPieces";

type props = {
  src: string;
  alt: string;
  href: string;
};

const InitialCard: React.FC<props> = ({ src, alt, children, href = "/" }) => {
  return (
    <Box
      rounded="35px"
      position="relative"
      height={["9.375rem", "11.5em"]}
      width={["7.188rem", "10em"]}
      boxShadow=" 10px 10px 50px rgba(0, 0, 0, 0.5)"
    >
      <ImageHeader alt={alt} src={src} height="100%" width="100%" />
      <BasicFooter
        borders={["0px", "35px"]}
        height="25%"
        position="absolute"
        top="75%"
        bottom="0"
        zIndex={3}
        backgroundColor="#FFFFFF"
      >
        <Link href={href}>{children}</Link>
      </BasicFooter>
    </Box>
  );
};

export default InitialCard;
