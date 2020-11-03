import * as React from "react";
import { IconButton as IconBtn, IconButtonProps } from "@chakra-ui/core";

const IconButton: React.FC<IconButtonProps & { borders?: [string, string] | string }> = ({
  color,
  backgroundColor,
  icon,
  onClick,
  type,
  display,
  width = ["3.5rem", "3.875rem"],
  height = ["1.9rem", "2.188rem"],
  borders = ["35px", "35px", "35px", "35px", "35px"],
  margin = 0,
  _hover = {
    transform: "scale(1.1,1.1)",
  },
  borderColor = "transparent",
}) => (
  <IconBtn
    aria-label="Icon"
    type={type}
    onClick={onClick}
    roundedLeft={borders[0] ?? borders}
    roundedRight={borders[1] ?? borders}
    color={color}
    borderColor={borderColor}
    borderWidth="1px"
    backgroundColor={backgroundColor}
    width={width}
    height={height}
    alignItems="center"
    icon={icon}
    display={display ?? "flex"}
    margin={margin}
    _hover={_hover}
    _focus={{}}
    _active={{}}
  />
);

export default IconButton;
