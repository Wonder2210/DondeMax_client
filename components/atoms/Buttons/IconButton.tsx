import * as React from "react";
import { IconButton as IconBtn, IconButtonProps } from "@chakra-ui/core";

const IconButton: React.FC<IconButtonProps> = ({ color, backgroundColor, icon, borderRadius }) => (
  <IconBtn
    aria-label="Icon"
    borderRadius={borderRadius ?? "35px"}
    color={color}
    backgroundColor={backgroundColor}
    width="62px"
    height="35px"
    icon={icon}
  />
);

export default IconButton;
