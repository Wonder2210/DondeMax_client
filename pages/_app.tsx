import * as React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Client from "../utils/GraphqlClient";
import "react-multi-carousel/lib/styles.css";
import "./index.css";

import theme from "../utils/theme";
// import "./index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ApolloProvider client={Client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default MyApp;
