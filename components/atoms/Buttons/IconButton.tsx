import * as React from "react";
import { IconButton as IconBtn, IconButtonProps } from "@chakra-ui/core";

const IconButton: React.FC<IconButtonProps & { borders?: [string, string] }> = ({
  color,
  backgroundColor,
  icon,
  borders,
}) => (
  <IconBtn
    aria-label="Icon"
    roundedLeft={borders[0] ?? "35px"}
    roundedRight={borders[1] ?? "35px"}
    color={color}
    backgroundColor={backgroundColor}
    width="62px"
    height="35px"
    icon={icon}
  />
);

export default IconButton;
