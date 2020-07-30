import * as React from "react";
import { Input, InputGroup, InputRightAddon, InputLeftAddon, InputProps } from "@chakra-ui/core";

type props = {
  left?: React.ReactNode | string;
  right?: React.ReactNode | string;
  borderRadius?: string;
  readonly?: boolean;
  placeholder?: string;
  margin?: string;
  onChange?: () => void;
  value?: string;
  border?: string;
  borderColor?: string;
};

const TextInput: React.FC<props> = ({
  onChange,
  value,
  readonly,
  borderRadius = "35px",
  border,
  left,
  right,
  placeholder,
  borderColor,
  margin,
}) => {
  return (
    <InputGroup>
      <InputLeftAddon backgroundColor="rgba(0,0,0,0)" borderColor="rgba(0,0,0,0)" padding={0}>
        {left ?? ""}
      </InputLeftAddon>
      <Input
        backgroundColor="#FFF !important"
        variant="filled"
        borderColor={borderColor}
        borderRadius={borderRadius}
        border={border}
        margin={margin}
        isReadOnly={readonly ?? false}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        _focus={{ backgroundColor: "#FFF" }}
      />
      <InputRightAddon padding={0} width="auto" rounded="35px" borderColor="rgba(0,0,0,0)">
        {right ?? ""}
      </InputRightAddon>
    </InputGroup>
  );
};

export default TextInput;
