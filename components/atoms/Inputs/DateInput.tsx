import * as React from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { format } from "date-fns";
import "react-day-picker/lib/style.css";

type props = {
  id: string;
  helper?: string;
  label: string;
  field?: { name: string };
  form?: {
    setFieldValue: (e: string, ee: string) => void;
  };
  isInvalid?: boolean;
  errorMessage: string;
};
const DateInput: React.FC<props> = ({ id, helper, label, field, isInvalid, form, errorMessage }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <DayPickerInput
        data-testid="date-input"
        format="dd/mm/yyyy"
        dayPickerProps={{ disabledDays: { before: new Date() } }}
        onDayChange={(val) => form.setFieldValue(field.name, format(val, "MM/dd/yyyy"))}
      />
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default DateInput;
