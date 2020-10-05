import * as React from "react";
import { IconButton as IconBtn, IconButtonProps } from "@chakra-ui/core";

interface props extends IconButtonProps {
  borders?: [string, string];
}

const IconButton: React.FC<props> = ({
  color,
  backgroundColor,
  icon,
  onClick,
  width = ["3.5rem", "3.875rem"],
  height = ["1.9rem", "2.188rem"],
  borders = ["35px", "35px"],
  margin = 1,
  _hover = {
    transform: "scale(1.1,1.1)",
  },
  borderColor = "",
}) => (
  <IconBtn
    aria-label="Icon"
    onClick={onClick}
    roundedLeft={borders[0]}
    roundedRight={borders[1]}
    color={color}
    borderColor={borderColor}
    borderWidth="1px"
    backgroundColor={backgroundColor}
    width={width}
    height={height}
    icon={icon}
    margin={margin}
    _hover={_hover}
    _focus={{}}
    _active={{}}
  />
);

export default IconButton;
