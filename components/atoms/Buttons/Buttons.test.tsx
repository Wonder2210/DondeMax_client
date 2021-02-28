import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Icon } from "@iconify/react";
import Delete from "@iconify/icons-cil/delete";
import { render } from "../../../utils/test-utils";
import Button from "./Button";
import IconButton from "./IconButton";

describe("Buttons", () => {
  test("Right bg color", () => {
    render(
      <Button backgroundColor="rgb(238, 238, 238)" color="black">
        Increment
      </Button>,
    );

    const button = screen.getByTestId("button");

    expect(button).toHaveStyle("background-color: rgb(238, 238, 238)");
  });

  test("on Click", () => {
    const mockOnClick = jest.fn();
    render(
      <Button backgroundColor="rgb(238, 238, 238)" onClick={mockOnClick} color="black">
        Increment
      </Button>,
    );

    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(mockOnClick.call.length).toBe(1);
  });
});

describe("icon buttons", () => {
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
});
