import React from "react";
import { Text, Box, BoxProps, TextProps } from "@chakra-ui/react";

type props = {
  width?: string;
  height?: string;
  boxProps?: BoxProps;
};

const Parragraph: React.FC<props & TextProps> = ({
  children,
  color = "black",
  fontSize = { base: "1em", sm: "1em", md: "1.5em", lg: "2em", xl: "2.5em" },
  textAlign = "center",
  boxProps,
  ...props
}) => {
  return (
    <Box position="relative" {...boxProps}>
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
