import React from "react";
import { addDecorator } from "@storybook/react";
import theme from "../utils/theme";
import { ChakraProvider } from "@chakra-ui/core";

addDecorator((storyFn) => <ChakraProvider theme={theme}>{storyFn()}</ChakraProvider>);
