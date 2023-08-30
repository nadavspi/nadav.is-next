import React from "react";
import styled from "styled-components";
import { mq } from "../../config/theme";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: ${(props) => mq(props, "large")}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Grid = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Grid;
