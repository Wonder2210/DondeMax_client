import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utils/test-utils";
import FormInput from "./FormInput";

type ComponentProps = React.ComponentProps<typeof FormInput>;

const baseProps: ComponentProps = {
  id: "test",
  errorMessage: "error",
  label: "form",
  placeHolder: "test placeholder",
  helper: "some info",
  type: "text",
};

const setup = (props: Partial<ComponentProps> = {}) => {
  const utils = render(<FormInput {...baseProps} {...props} />);
  const input = utils.getByTestId("form-input") as HTMLInputElement;
  const errorMessage = utils.getByTestId("form-error-message");
  const helper = utils.getByTestId("form-helper");
  const label = utils.getByTestId("form-label");
  return {
    input,
    errorMessage,
    helper,
    label,
    ...utils,
  };
};
describe("text input", () => {
  test("input value", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "text only" } });
    expect(input.value).toBe("text only");
  });
  test("correct label form text", () => {
    const { label } = setup();
    const { errorMessage } = setup();

    expect(label.innerText).toBe("form");
    expect(errorMessage).not.toBeVisible();
  });
  test("correct helper form text", () => {
    const { helper } = setup();
    const { errorMessage } = setup();

    expect(helper.innerText).toBe("some info");
    expect(errorMessage).not.toBeVisible();
  });
  test("Error message", () => {
    const { errorMessage } = setup({ errorMessage: "error", isInvalid: true });
    expect(errorMessage).toBeVisible();
    expect(errorMessage.innerText).toBe("error");
  });
});
