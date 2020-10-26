import React from "react";
import TextInput from "./TextInput";
import FormInput from "./FormInput";

export const SingleTextInput = () => {
  return (
    <div>
      <TextInput value="Here we go bro " readonly />
    </div>
  );
};
export const FilledInput = () => {
  return (
    <div>
      <TextInput placeholder="Name sista" variant="flushed" label="name" />
    </div>
  );
};

export const FormInputEx = () => (
  <FormInput
    id="test"
    type="text"
    label="put your hands up"
    borders="0 0 1px 0 red solid"
    placeHolder="put your hnds up"
    variant="flushed"
  />
);

export default {
  title: "Atoms/Inputs",
};


