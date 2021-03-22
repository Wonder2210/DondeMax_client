import * as React from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

type props = {
  id: string;
  disabled?: boolean;
  helper?: string;
  label: string;
  value: string;
  name: string;
  onChange: (val: string) => void;
  isInvalid?: boolean;
  errorMessage: string;
  field: object;
};
const TimeInput: React.FC<props> = ({
  id,
  helper,
  label,
  value,
  field,
  disabled,
  name,
  isInvalid,
  onChange,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={isInvalid} isDisabled={disabled}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TimePicker
        {...field}
        amPmAriaLabel="Select AM/PM"
        minTime="07:00:00"
        maxTime="19:00:00"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default TimeInput;
