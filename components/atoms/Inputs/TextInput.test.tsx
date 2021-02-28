import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utils/test-utils";
import TextInput from "./TextInput";

describe("text input", () => {
  const setup = () => {
    const utils = render(<TextInput />);
    const input = utils.getByTestId("text-input") as HTMLInputElement;
    return {
      input,
      ...utils,
    };
  };
  test("input", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "text only" } });
    expect(input.value).toBe("text only");
  });
});
