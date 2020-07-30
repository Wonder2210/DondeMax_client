import * as React from "react";
import { List as Lst } from "@chakra-ui/core";

type props = {
  spacing: number;
  borders?: [string, string];
  borderWidth?: string;
  padding?: number;
  width?: string;
};

const List: React.FC<props> = ({
  spacing,
  children,
  borders = ["35px", "35px"],
  borderWidth,
  width = "100%",
  padding,
}) => {
  return (
    <Lst
      spacing={spacing}
      width={width}
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
