import React from "react";
import TextInput from "./TextInput";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";

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

export const SelectInputTest = () => (
  <SelectInput
    id="i"
    errorMessage="nothing"
    defaultValue={2}
    placeholder="test"
    variant="flushed"
    label="test"
    options={[
      { id: 1, type: "here" },
      { id: 2, type: "there" },
    ]}
  />
);

export default {
  title: "Atoms/inputs",
};
