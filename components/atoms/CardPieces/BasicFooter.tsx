import React from "react";
import { Flex, FlexProps } from "@chakra-ui/core";

const BasicFooter: React.FC<
  FlexProps & {
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
    <Flex
      backgroundColor={backgroundColor}
      zIndex={zIndex ?? 0}
      pos={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      width={width}
      height={height ?? ""}
      align="center"
      justify="center"
      roundedTop={borders[0]}
      roundedBottom={borders[1]}
    >
      {children}
    </Flex>
  );
};

export default BasicFooter;
