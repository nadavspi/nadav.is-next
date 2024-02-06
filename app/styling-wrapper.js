"use client";

import Fonts from "../components/Fonts";
import GlobalStyle from "../components/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "../config/theme";
import StyledComponentsRegistry from "./lib/registry";

export default function StylingWrapper({ children }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <Fonts />
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
