/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import GraphqlProvider from "@/utils/GraphqlClient";
import "react-multi-carousel/lib/styles.css";
import theme from "../utils/theme";
import { AppProvider } from "@/utils/AppContext";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/core";

const MyApp = ({ Component, pageProps }) => {
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
