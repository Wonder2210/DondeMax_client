/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react";

type props = {
  id: string;
  type: "email" | "number" | "text" | "password";
  helper?: string;
  label: string;
  placeHolder: string;
  variant?: "outline" | "unstyled" | "flushed" | "filled";
  borders?: string;
  focusBorderColor?: string;
  field?: {};
  isInvalid?: boolean;
  errorMessage: string;
};
const FormInput: React.FC<props> = ({
  id,
  type,
  helper,
  label,
  variant,
  placeHolder,
  borders,
  focusBorderColor,
  field,
  isInvalid,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel data-testid="form-label" htmlFor={id}>
        {label}
      </FormLabel>
      <Input
        data-testid="form-input"
        {...field}
        type={type}
        placeholder={placeHolder}
        variant={variant}
        border={borders}
        focusBorderColor={focusBorderColor}
      />
      <FormHelperText data-testid="form-helper">{helper}</FormHelperText>
      <FormErrorMessage data-testid="form-error-message">{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
