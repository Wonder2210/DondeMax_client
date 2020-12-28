import * as React from "react";
import { Button as Btn, ButtonProps } from "@chakra-ui/core";

const Button: React.FC<ButtonProps> = ({
  type,
  width,
  height,
  size,
  color,
  onClick,
  backgroundColor,
  rightIcon,
  borderRadius,
  children,
  isLoading = false,
  _hover = {},
  loadingText = "",
}) => {
  return (
    <Btn
      backgroundColor={backgroundColor ?? "black"}
      onClick={onClick}
      type={type}
      size={size ?? "md"}
      width={width ?? ["95%", "15.625rem"]}
      height={height ?? ["8vh", "77px"]}
      color={color ?? "white"}
      borderRadius={borderRadius ?? "35px"}
      fontWeight="bold"
      fontSize={[".9rem", "1.125rem"]}
      _hover={_hover}
      isLoading={isLoading}
      loadingText={loadingText}
      rightIcon={rightIcon}
    >
      {children}
    </Btn>
  );
};

export default Button;
