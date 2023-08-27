import React, { useState } from "react";
import styled from "styled-components";
import { useMDXComponent } from "next-contentlayer/hooks";


const Title = styled.h3`
  margin-bottom: 0;
`;
const Chinese = styled.div``;
const English = styled.div`
  font-style: italic;
`;

const Metadata = styled.div``;

const Item = ({ item }) => {
  const Body = useMDXComponent(item.body.code);
  return (
    <div>
      <Body />
      <Title>
        <Chinese>{item.titleZh}</Chinese>
        <English>{item.title}</English>
      </Title>
      <Metadata>
        {item.year}, {item.type}
      </Metadata>
    </div>
  );
};

export default Item;
