import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    font-size: 22px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.55;
    color: ${props => props.theme.colors.primary};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes[8]};
  }

  a {
    text-decoration: none;
    font-style: italic;
    color: ${props => props.theme.colors.purple};
    transition: color .2s ease-in-out;

    &:hover,
    &:active {
      color: ${props => props.theme.colors.primary}
    }
  }
`;

export default GlobalStyle;
