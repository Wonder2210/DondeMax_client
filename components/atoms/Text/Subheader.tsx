import * as React from "react";
import { Text } from "@chakra-ui/core";

const Subheader: React.FC<{ color?: string }> = ({ children, color }) => {
  return (
    <Text fontSize="xl" color={color ?? "black"}>
      {children}
    </Text>
  );
};

export default Subheader;
