import * as React from "react";
import { Text } from "@chakra-ui/core";

const Subheader: React.FC<{ color?: string }> = ({ children, color }) => {
  return (
    <Text fontSize={["1rem", "1rem", "xl", "xl"]} fontWeight="medium" color={color ?? "black"}>
      {children}
    </Text>
  );
};

export default Subheader;
