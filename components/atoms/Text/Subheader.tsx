import * as React from "react";
import { Text } from "@chakra-ui/core";

type props = { color?: string };

const Subheader: React.FC<props> = ({ children, color }) => {
  return (
    <Text
      fontSize={["1rem", "1rem", "xl", "xl"]}
      fontWeight="medium"
      d="flex"
      justifyItems="center"
      textAlign={["center", "center"]}
      color={color ?? "black"}
    >
      {children}
    </Text>
  );
};

export default Subheader;
