import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utils/test-utils";
import Button from "./Button";

test("initial", () => {
  render(
    <Button backgroundColor="#EEE" color="black">
      Increment
    </Button>,
  );

  const button = screen.getByRole("button");

  expect(button).toHaveStyle("background-color: rgb(238, 238, 238)");
});
