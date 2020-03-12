import App from "next/app";
import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "rebeccapurple"
  }
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "FF Tundra";
    font-weight: bold;
    src: url("/static/fonts/1468515/c7cb398d-54e6-42ed-9041-e3e1ac428fb0.woff2")
        format("woff2"),
      url("/static/fonts/1468515/f30abd5f-0012-4378-923c-b16106dcd3a5.woff")
        format("woff");
  }
  @font-face {
    font-family: "FF Tundra";
    font-style: italic;
    src: url("/static/fonts/1468539/c65ef4d4-020f-4e58-bf9c-f9e5495344f7.woff2")
        format("woff2"),
      url("/static/fonts/1468539/14437e62-00cf-40af-be95-739d3404092c.woff")
        format("woff");
  }
  @font-face {
    font-family: "FF Tundra";
    src: url("/static/fonts/1468559/79a3e616-8931-4235-b8dc-0f9718329786.woff2")
        format("woff2"),
      url("/static/fonts/1468559/98d8ab99-1bd9-4469-8ed9-e5bb30485dce.woff")
        format("woff");
  }
  body {
    font-family: "FF Tundra";
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
