import * as React from "react";
import { Listitem as Lst, ListIcon } from "@chakra-ui/core";

type props = {
  icon?: React.FunctionComponent;
  color?: string;
};

const Listitem: React.FC<props> = ({ icon, color, children }) => {
  return (
    <Lst>
      <ListIcon icon={icon} color={color ?? "#FB2C52"} />
      {children}
    </Lst>
  );
};

export default Listitem;
