import * as React from "react";
import { render, RenderResult } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/theme";

const Wrappers = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (ui: React.ReactElement, options?): RenderResult => {
  return render(ui, { wrapper: Wrappers, ...options });
};

export { customRender as render };
