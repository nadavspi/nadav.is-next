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
    font-size: 18px;

    @media (min-width: 40rem) {
      font-size: 22px;
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.55;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.darkpurple};
  }

  h1 {
    font-size: ${props => props.theme.fontSizes[8]};
  }

  a {
    text-decoration: none;
    font-style: italic;
    color: ${props => props.theme.colors.mutedorange};
    transition: color .2s ease-in-out;

    &:hover,
    &:active {
      color: ${props => props.theme.colors.cyan}
    }
  }
`;

export default GlobalStyle;
