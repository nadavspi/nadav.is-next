import React from "react";
import styled from "styled-components";
import { mq } from "../../config/theme";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;

  @media (min-width: ${(props) => mq(props, "large")}) {
    grid-template-columns: 50% 50%;
  }
`;

const Grid = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Grid;
