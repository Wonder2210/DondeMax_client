import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

const BasicFooter: React.FC<
  BoxProps & {
    borders?: [string, string];
  }
> = ({
  children,
  position = "static",
  zIndex,
  width = "100%",
  height = "0",
  right = "0",
  bottom = "0",
  left = "0",
  top = "0",
  backgroundColor = "#FFF",
  borders = ["35px", "35px"],
}) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      zIndex={zIndex ?? 0}
      pos={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      width={width}
      height={height ?? ""}
      alignItems="center"
      justifyContent="center"
      roundedTop={borders[0]}
      roundedBottom={borders[1]}
      display="flex"
    >
      {children}
    </Box>
  );
};

export default BasicFooter;
