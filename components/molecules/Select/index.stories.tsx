import React from "react";
import InputDropdown, { SelectOption } from "./Select";

export const TestDropdownInput = () => {
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState("");

  const onChange = (e) => {
    setValue(e);
  };

  const toggle = (e: boolean) => {
    setShow(e);
  };
  return (
    <InputDropdown value={value} onChange={onChange} toggle={toggle} placeholder="put here what you want" show={show}>
      <SelectOption value="here">Here</SelectOption>
      <SelectOption value="option">There</SelectOption>
      <SelectOption value="last">everywhere</SelectOption>
    </InputDropdown>
  );
};

export default {
  title: "Molecules/Select",
};
