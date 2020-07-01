import * as React from "react";
import { Input, InputProps } from "@chakra-ui/core";

const TextInput: React.FC<InputProps> = ({ onChange, value, borderRadius }) => {
  return <Input onChange={onChange} value={value} borderRadius={borderRadius ?? "35px"} />;
};

export default TextInput;
