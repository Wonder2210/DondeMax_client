import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import "react-multi-carousel/lib/styles.css";
import "./index.css";

import theme from "../utils/theme";
// import "./index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
