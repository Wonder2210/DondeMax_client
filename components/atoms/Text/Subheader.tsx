import * as React from "react";
import { Text } from "@chakra-ui/core";

const Subheader: React.FC<{ color: string }> = ({ children, color }) => {
  return (
    <Text size="24px" color={color}>
      {children}
    </Text>
  );
};

export default Subheader;
