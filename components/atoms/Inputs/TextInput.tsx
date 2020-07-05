import * as React from "react";
import { Input, InputGroup, InputRightAddon, InputLeftAddon, InputProps } from "@chakra-ui/core";

type props = InputProps & {
  left?: React.ReactNode | string;
  right?: React.ReactNode | string;
  borders?: [string, string];
  readonly?: boolean;
  placeholder?: string;
};

const TextInput: React.FC<props> = ({
  onChange,
  value,
  readonly,
  borders = ["35px", "35px"],
  left,
  right,
  placeholder,
}) => {
  return (
    <InputGroup>
      <InputLeftAddon>{left ?? ""}</InputLeftAddon>
      <Input
        roundedLeft={borders[0]}
        roundedRight={borders[1]}
        isReadOnly={readonly ?? false}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <InputRightAddon>{right ?? ""}</InputRightAddon>
    </InputGroup>
  );
};

export default TextInput;
