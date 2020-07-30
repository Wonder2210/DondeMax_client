import React from "react";
import Header from "./Header";
import Subheader from "./Subheader";
import Parragraph from "./Parragraph";

export const HeaderTest = () => {
  return (
    <Header>
      <Header color="rose.600" nested>
        D
      </Header>
      eader
    </Header>
  );
};
export const SubHeaderTest = () => {
  return <Subheader>SUB HEADER</Subheader>;
};

export const ParragraphTest = () => {
  return <Parragraph>Here we ware </Parragraph>;
};

export default {
  title: "Atoms/Text",
};
