import * as React from "react";
import { List as Lst } from "@chakra-ui/core";

type props = {
  spacing: number;
  borders?: [string, string];
  borderWidth?: string;
  padding?: number;
};

const List: React.FC<props> = ({ spacing, children, borders = ["35px", "35px"], borderWidth, padding }) => {
  return (
    <Lst
      spacing={spacing}
      width="100%"
      borderWidth={borderWidth ?? "0px"}
      roundedTop={borders[0]}
      roundedBottom={borders[1]}
      borderColor="#acadad"
      padding={padding}
    >
      {children}
    </Lst>
  );
};

export default List;
