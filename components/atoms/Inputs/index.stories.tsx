import React from "react";
import TextInput from "./TextInput";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import NumberInput from "./NumberInput";
import Dynamic from "./DynamicType";
import DropImage from "./DropImage";

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

export const NumberInputTest = () => {
  return <NumberInput field={{}} label="number" id="number" />;
};

export const DYnamicTest = () => {
  return (
    <Dynamic
      options={[
        { id: 1, type: "here" },
        { id: 2, type: "there" },
      ]}
      focusBorderColor="colors.rose.600"
      variant="flushed"
      placeholder="Dynamic"
      add={(e) => console.log(e)}
    />
  );
};

export const DropImageTest = () => {
  const onChange = (e) => console.log(e);
  return (
    <div style={{ height: "20em", width: "20em" }}>
      <DropImage onChange={onChange} />
    </div>
  );
};

export default {
  title: "Atoms/inputs",
};
