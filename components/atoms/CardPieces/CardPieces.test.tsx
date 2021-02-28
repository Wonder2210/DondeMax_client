import * as React from "react";

import { render } from "../../../utils/test-utils";
import BasicFooter from "./BasicFooter";
import ImageHeader from "./ImageHeader";

describe("Card pieces", () => {
  test("basic footer", () => {
    const { asFragment } = render(<BasicFooter>here i am</BasicFooter>);

    expect(asFragment()).toMatchSnapshot();
  });

  test("ImageHeader", () => {
    const { asFragment } = render(<ImageHeader alt="placeholder" src="https://via.placeholder.com/150" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
