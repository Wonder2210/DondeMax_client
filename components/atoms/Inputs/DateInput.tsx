/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/core";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { format } from "date-fns";
import "react-day-picker/lib/style.css";

type props = {
  id: string;
  helper?: string;
  label: string;
  field?: object;
  form?: object;
  isInvalid?: boolean;
  errorMessage: string;
};
const FormInput: React.FC<props> = ({ id, helper, label, field, isInvalid, form, errorMessage }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <DayPickerInput
        format="dd/mm/yyyy"
        onDayChange={(val) => form.setFieldValue(field.name, format(val, "dd/MM/yyyy"))}
      />
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
