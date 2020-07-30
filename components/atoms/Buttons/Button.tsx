import * as React from "react";
import { Button as Btn, ButtonProps } from "@chakra-ui/core";
// import './styles.css';

const Button: React.FC<ButtonProps> = ({
  width,
  height,
  size,
  color,
  onClick,
  backgroundColor,
  rightIcon,
  children,
}) => {
  return (
    <Btn
      backgroundColor={backgroundColor ?? "black"}
      onClick={onClick}
      size={size ?? "md"}
      width={width ?? ["95%", "15.625rem"]}
      height={height ?? ["8vh", "77px"]}
      color={color ?? "white"}
      borderRadius="35px"
      fontWeight="bold"
      fontSize={[".9rem", "1.125rem"]}
      _hover={{}}
      rightIcon={rightIcon}
    >
      {children}
    </Btn>
  );
};

export default Button;
