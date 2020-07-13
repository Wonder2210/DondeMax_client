import * as React from "react";
import { IconButton as IconBtn, IconButtonProps } from "@chakra-ui/core";

const IconButton: React.FC<IconButtonProps & { borders?: [string, string] }> = ({
  color,
  backgroundColor,
  icon,
  onClick,
  width = ["3.5rem", "3.875rem"],
  height = ["1.9rem", "2.188rem"],
  borders = ["35px", "35px"],
  margin = 1,
}) => (
  <IconBtn
    aria-label="Icon"
    onClick={onClick}
    roundedLeft={borders[0]}
    roundedRight={borders[1]}
    color={color}
    backgroundColor={backgroundColor}
    width={width}
    height={height}
    icon={icon}
    margin={margin}
    _hover={{
      transform: "scale(1.1,1.1)",
    }}
    _focus={{}}
    _active={{}}
  />
);

export default IconButton;
