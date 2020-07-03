import * as React from "react";
import { Input, InputGroup, InputRightAddon, InputLeftAddon, InputProps } from "@chakra-ui/core";

type props = InputProps & {
  left?: React.ReactNode | string;
  right?: React.ReactNode | string;
  borders?: [string, string];
  readonly: boolean;
};

const TextInput: React.FC<props> = ({ onChange, value, readonly, borders, left, right }) => {
  return (
    <InputGroup>
      <InputLeftAddon>{left ?? ""}</InputLeftAddon>
      <Input
        roundedLeft={borders[0] ?? "35px"}
        roundedRight={borders[1] ?? "35px"}
        isReadOnly={readonly ?? false}
        onChange={onChange}
        value={value}
      />
      <InputRightAddon>{right ?? ""}</InputRightAddon>
    </InputGroup>
  );
};

export default TextInput;
