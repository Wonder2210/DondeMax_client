import React from "react";
import { action } from "@storybook/addon-actions";
import ArrowsGroup from "./ArrowsGroup";

export const Arrows = () => {
  return <ArrowsGroup next={action("next")} previous={action("previous")} />;
};

export default {
  title: "Molecules/ArrowsGroup",
};
