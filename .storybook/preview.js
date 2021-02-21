import React from "react";
import { addDecorator } from "@storybook/react";
import theme from "../utils/theme";
import { ChakraProvider } from "@chakra-ui/core";
import { MockedProvider } from "@apollo/client/testing";
import { AppProvider } from "../utils/AppContext";

const Provider = ({ children }) => (
  <MockedProvider>
    <AppProvider>{children}</AppProvider>
  </MockedProvider>
);

export const decorators = [
  (Story) => (
    <Provider theme="default">
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
