import App from "next/app";
import GlobalStyle from "../components/GlobalStyles";
import Fonts from "../components/Fonts";
import React from "react";
import theme from "../config/theme";
import { ThemeProvider } from "styled-components";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Fonts />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
