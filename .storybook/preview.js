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

addDecorator((storyFn) => (
  <Provider>
    <ChakraProvider theme={theme}>{storyFn()}</ChakraProvider>
  </Provider>
));
