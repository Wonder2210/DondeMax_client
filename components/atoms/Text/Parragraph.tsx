import React from "react";
import { Text, Box, TextProps } from "@chakra-ui/core";

type props = {
  width?: string;
  height?: string;
};

const Parragraph: React.FC<props & TextProps> = ({
  children,
  width = "100%",
  height = "100%",
  color = "black",
  fontSize = { base: "1em", sm: "1em", md: "1.5em", lg: "2em", xl: "2.5em" },
  textAlign = "center",
  ...props
}) => {
  return (
    <Box position="relative" width={width} height={height}>
      <Text
        height="100%"
        width="100%"
        position="relative"
        color={color}
        fontSize={fontSize}
        textAlign={textAlign}
        {...props}
      >
        {children}
      </Text>
    </Box>
  );
};

export default Parragraph;
