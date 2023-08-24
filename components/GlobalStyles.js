import {createGlobalStyle} from "styled-components";

import {mq} from "../config/theme";

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

    @media (min-width: ${props => mq(props)}) {
      font-size: 23px;
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

  img {
    max-width: 100%;
    height: auto;
  }

  h1,
  h2,
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  h1 {
    font-size: ${props => props.theme.fontSizes[6]};
    @media (min-width: ${props => mq(props)}) {
      font-size: ${props => props.theme.fontSizes[8]};
    }
  }

  h2 {
    font-size: ${props => props.theme.fontSizes[5]};
    @media (min-width: ${props => mq(props)}) {
      font-size: ${props => props.theme.fontSizes[7]};
    }
  }

  h3 {
    font-size: ${props => props.theme.fontSizes[4]};
    @media (min-width: ${props => mq(props)}) {
      font-size: ${props => props.theme.fontSizes[6]};
    }
  }

  a {
    text-decoration: none;
    font-style: italic;
    color: ${props => props.theme.colors.mutedorange};
    transition: color 0.2s ease-in-out;

    &:hover,
    &:active {
      color: ${props => props.theme.colors.cyan};
    }
  }
`;

export default GlobalStyle;
