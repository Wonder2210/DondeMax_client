import * as React from "react";
import {
  NumberInput as NmbrInput,
  useNumberInput,
  useMediaQuery,
  NumberInputField,
  HStack,
  Button,
  Input,
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
  size?: string;
  max?: number;
  min?: number;
  helper?: string;
  errorMessage?: string;
  label: string;
  isInvalid?: boolean;
  id?: string;
  variant?: string;
  isRequired?: boolean;
  onChange?: (e: number, ee: string) => void;
};

const NumberInput: React.FC<props> = ({
  defaultValue = 0,
  min = 0,
  max = 1000,

  label,
  helper,
  errorMessage,
  isInvalid,
  variant,
  isRequired,
  onChange,
  size,
  id,
}) => {
  const [isPhone] = useMediaQuery("(max-width:768px)");
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue,
    min,
    max,
    onChange,
  });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <FormControl id={id} isRequired={isRequired} size={size} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {isPhone ? (
        <HStack maxW="320px">
          <Button {...inc}>+</Button>
          <Input {...input} isReadOnly />
          <Button {...dec}>-</Button>
        </HStack>
      ) : (
        <NmbrInput
          defaultValue={defaultValue}
          maxW={16}
          size={size}
          onChange={onChange}
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
      )}
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default NumberInput;
