/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { FormControl, FormLabel, FormHelperText, FormErrorMessage, Select } from "@chakra-ui/react";

type props = {
  id: string;
  disabled?: boolean;
  helper?: string;
  label: string;
  placeholder: string;
  defaultValue?: number;
  variant?: "outline" | "unstyled" | "flushed" | "filled";
  borders?: string;
  focusBorderColor?: string;
  field?: {};
  isInvalid?: boolean;
  errorMessage: string;
  options: Array<{ id: number | string; type: String }>;
};
const SelectInput: React.FC<props> = ({
  id,
  helper,
  disabled,
  label,
  variant,
  placeholder,
  options,
  focusBorderColor,
  field,
  isInvalid,
  errorMessage,
  defaultValue,
}) => {
  const optionsRender = options.map((item) => {
    if (defaultValue === item.id) {
      return (
        <option key={item.id} value={String(item.id)} selected>
          {item.type}
        </option>
      );
    }
    return (
      <option key={item.id} value={String(item.id)}>
        {item.type}
      </option>
    );
  });
  return (
    <FormControl isInvalid={isInvalid} isDisabled={disabled}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        {...field}
        placeholder={placeholder}
        isDisabled={disabled}
        variant={variant}
        focusBorderColor={focusBorderColor}
      >
        {optionsRender}
      </Select>
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default SelectInput;
