import * as React from "react";
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";

type props = {
  id: string;
  helper?: string;
  field?: { name: string };
  form?: {
    setFieldValue: (e: string, ee: string) => void;
  };
  isInvalid?: boolean;
  errorMessage: string;
};

const RateInput: React.FC<props> = ({ isInvalid, form, field, id, helper, errorMessage }) => {
  const onChange = (value) => {
    form.setFieldValue(field.name, value);
  };
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={id}>Valoracion</FormLabel>
      <ReactStars onChange={onChange} count={5} edit size={24} isHalf activeColor="#ffd700" />
      <FormHelperText>{helper}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default RateInput;
