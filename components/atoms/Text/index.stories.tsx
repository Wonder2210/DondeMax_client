import React from "react";
import Header from "./Header";
import Subheader from "./Subheader";
import Parragraph from "./Parragraph";

export const HeaderTest = () => {
  return (
    <>
      <Header color="colors.rose.600">D</Header>
      <Header>eader</Header>
      <br />
      <Header type="h6" weight="semibold" fontSize="1.5em">
        Here
      </Header>
    </>
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
