import * as React from "react";
import { ListItem as Lst, ListIcon } from "@chakra-ui/react";

type props = {
  icon?: React.FunctionComponent | string;
  color?: string;
  fontSize?: string;
  marginLeft?: string | number;
};

const Listitem: React.FC<props> = ({ marginLeft, icon, color, children, fontSize = "xl" }) => {
  return (
    <Lst fontSize={fontSize} marginLeft={marginLeft}>
      {icon && <ListIcon color={color ?? "#FB2C52"} />}

      {children}
    </Lst>
  );
};

export default Listitem;
