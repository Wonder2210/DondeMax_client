import * as React from "react";
import { Text } from "@chakra-ui/core";

type props = { color?: string; fontSize?: string; fontWeight?: string };

const Subheader: React.FC<props> = ({ children, color, fontSize, fontWeight }) => {
  return (
    <Text
      fontSize={fontSize ?? ["1rem", "1rem", "xl", "xl"]}
      fontWeight={fontWeight ?? "medium"}
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
