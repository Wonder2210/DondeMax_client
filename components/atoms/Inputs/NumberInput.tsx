import * as React from "react";
import {
  NumberInput as NmbrInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";

type props = {
  defaultValue?: number;
  max?: number;
  min?: number;
  helper?: string;
  errorMessage: string;
  field: { onChange: () => void };
  label: string;
  isInvalid?: boolean;
  id: string;
  form: object;
  variant: string;
};

const NumberInput: React.FC<props> = ({
  defaultValue = 0,
  min = 0,
  max = 1000,
  field,
  label,
  helper,
  errorMessage,
  isInvalid,
  variant,
  form,
  id,
}) => {
  return (
    <FormControl id={id} isRequired isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <NmbrInput
        defaultValue={defaultValue}
        onChange={(val) => form.setFieldValue(field.name, val)}
        min={min}
        max={max}
        variant={variant}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NmbrInput>
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default NumberInput;
