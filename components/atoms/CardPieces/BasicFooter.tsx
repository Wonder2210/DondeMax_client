import React from "react";
import { Box } from "@chakra-ui/core";

type props = {
  zIndex?: string;
  width?: string;
  height?: string;
};

const BasicFooter = ({ children, zIndex, width, height }) => {
  return (
    <Box zIndex={zIndex ?? ""} width={width ?? ""} height={height ?? ""} alignItems="center" justifyContent="center">
      {children}
    </Box>
  );
};

export default BasicFooter;
