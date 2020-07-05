import React from "react";
import TextInput from "./TextInput";

export const SingleTextInput = () => {
  return (
    <div>
      <TextInput value="Here we go bro " readOnly={true} />
    </div>
  );
};

export default {
  title: "Atoms/Inputs",
};
