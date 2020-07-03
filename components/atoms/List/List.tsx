import * as React from "react";
import { List as Lst } from "@chakra-ui/core";

type props = {
  spacing: number;
  borders?: [string, string];
  borderWidth?: string;
};

const List: React.FC<props> = ({ spacing, children, borders, borderWidth }) => {
  return (
    <Lst
      spacing={spacing}
      width="100%"
      borderWidth={borderWidth ?? "0px"}
      roundedTop={borders[0] ?? "35px"}
      roundedBottom={borders[1] ?? "35px"}
      borderColor="#acadad"
    >
      {children}
    </Lst>
  );
};

export default List;
