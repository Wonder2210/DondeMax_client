/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ChakraProvider} from "@chakra-ui/core";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import Client from "../utils/GraphqlClient";
import "react-multi-carousel/lib/styles.css";
import "./index.css";

import theme from "../utils/theme";
// import "./index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={Client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default MyApp;
