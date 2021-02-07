/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import GraphqlProvider from "@/utils/GraphqlClient";
import { ChakraProvider } from "@chakra-ui/core";

import "react-multi-carousel/lib/styles.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/utils/AppContext";
import theme from "../utils/theme";
import "./index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GraphqlProvider>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppProvider>
    </GraphqlProvider>
  );
};

export default MyApp;
