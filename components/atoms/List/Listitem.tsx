import * as React from "react";
import { ListItem as Lst, ListIcon } from "@chakra-ui/core";

type props = {
  icon?: React.FunctionComponent | string;
  color?: string;
};

const Listitem: React.FC<props> = ({ icon, color, children }) => {
  return (
    <Lst>
      {icon && <ListIcon icon={icon} color={color ?? "#FB2C52"} />}
      {children}
    </Lst>
  );
};

export default Listitem;
