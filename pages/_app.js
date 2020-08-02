import App from "next/app";
import Fonts from "../components/Fonts";
import GlobalStyle from "../components/GlobalStyles";
import Head from "next/head";
import React from "react";
import theme from "../config/theme";
import { ThemeProvider } from "styled-components";
import "./image-gallery.scss";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Fonts />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
