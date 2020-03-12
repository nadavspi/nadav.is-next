import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

export default GlobalStyle;
