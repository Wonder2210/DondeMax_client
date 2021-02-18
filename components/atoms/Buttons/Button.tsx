import * as React from "react";
import { Button as Btn, ButtonProps } from "@chakra-ui/react";

const Button: React.FC<ButtonProps> = ({
  color,
  onClick,
  backgroundColor,

  borderRadius,
  children,
  _hover = {},
  ...props
}) => {
  return (
    <Btn
      backgroundColor={backgroundColor ?? "black"}
      onClick={onClick}
      color={color ?? "white"}
      borderRadius={borderRadius ?? "35px"}
      fontWeight="bold"
      fontSize={[".9rem", "1.125rem"]}
      _hover={_hover}
      {...props}
    >
      {children}
    </Btn>
  );
};

export default Button;
