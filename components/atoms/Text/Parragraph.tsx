import React from "react";
import { Text, Box, ResponsiveValue } from "@chakra-ui/core";

type props = {
  width?: string;
  height?: string;
  color?: string;
  fontSize?: { sm: string; md: string; lg: string; xl: string } | string;
  textAlign?: any;
};

const Parragraph: React.FC<props> = ({
  children,
  width = "100%",
  height = "100%",
  color = "black",
  fontSize = { sm: "1em", md: "1.5em", lg: "2em", xl: "2.5em" },
  textAlign = "center",
}) => {
  return (
    <Box position="relative" width={width} height={height}>
      <Text height="100%" width="100%" position="relative" color={color} fontSize={fontSize} textAlign={textAlign}>
        {children}
      </Text>
    </Box>
  );
};

export default Parragraph;
