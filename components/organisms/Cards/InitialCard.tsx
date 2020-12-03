import React from "react";

import { Box } from "@chakra-ui/core";
import { BasicFooter, ImageHeader } from "../../atoms/CardPieces";

type props = {
  src: string;
  alt: string;
  href: string;
  height?: string;
  width?: string;
};

const InitialCard: React.FC<props> = ({ src, width, height, alt, children, href = "/" }) => {
  return (
    <Box
      rounded="35px"
      position="relative"
      height={height ?? ["9.375rem", "11.5em"]}
      marginBottom="5vh"
      marginLeft="1vw"
      width={width ?? ["7.188rem", "10em"]}
      boxShadow={{
        base: " 1px 1px 5px rgba(0, 0, 0, 0.5)",
        sm: " 1px 1px 5px rgba(0, 0, 0, 0.5)",
        md: " 10px 10px 50px rgba(0, 0, 0, 0.5)",
        lg: " 10px 10px 50px rgba(0, 0, 0, 0.5)",
        xl: " 10px 10px 50px rgba(0, 0, 0, 0.5)",
      }}
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
        {children}
      </BasicFooter>
    </Box>
  );
};

export default InitialCard;
