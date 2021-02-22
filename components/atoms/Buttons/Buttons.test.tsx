import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Icon } from "@iconify/react";
import Delete from "@iconify/icons-cil/delete";
import { render } from "../../../utils/test-utils";
import Button from "./Button";
import IconButton from "./IconButton";

test("initial", () => {
  render(
    <Button backgroundColor="#EEE" color="black">
      Increment
    </Button>,
  );

  const button = screen.getByRole("button");

  expect(button).toHaveStyle("background-color: rgb(238, 238, 238)");
});

test("icon button", () => {
  render(
    <IconButton
      aria-label="delete-test"
      data-testid="iconbutton"
      color="white"
      icon={<Icon icon={Delete} />}
      backgroundColor="blue"
    />,
  );
  const button = screen.getByRole("button");
  expect(button).toBeVisible();
});
