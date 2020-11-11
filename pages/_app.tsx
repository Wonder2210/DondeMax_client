/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import GraphqlProvider from "@/utils/GraphqlClient";
import "react-multi-carousel/lib/styles.css";
import theme from "../utils/theme";

import { ChakraProvider } from "@chakra-ui/core";

const MyApp = ({ Component, pageProps }) => {
  return (
    <GraphqlProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GraphqlProvider>
  );
};

export default MyApp;
