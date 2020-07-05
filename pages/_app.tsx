import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../utils/theme";
import "./index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
