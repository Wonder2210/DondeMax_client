import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utils/test-utils";
import DateInput from "./DateInput";

type ComponentProps = React.ComponentProps<typeof DateInput>;

const baseProps: ComponentProps = {
  id: "test",
  errorMessage: "error",
  label: "form",
  helper: "some info",
};

const setup = (props: Partial<ComponentProps> = {}) => {
  const propsWithFunc = {
    ...baseProps,
    form: {
      setFieldValue: jest.fn(),
    },
  };
  const utils = render(<DateInput {...propsWithFunc} {...props} />);
  const dateInput = utils.getByTestId("date-input");
  return {
    dateInput,

    ...utils,
  };
};
describe("text input", () => {
  test("input value", () => {
    const a = true;

    expect(a).toBe(true);
  });
});
