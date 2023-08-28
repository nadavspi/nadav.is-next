import Grid from "./Grid";
import React, { useState } from "react";
import Screenshot from "./Screenshot";
import styled from "styled-components";
import { useMDXComponent } from "next-contentlayer/hooks";
import YouTube from "../YouTube";

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
      <Title>
        <Chinese>{item.titleZh}</Chinese>
        <English>{item.title}</English>
      </Title>
      <Metadata>
        {item.year}, {item.type}
      </Metadata>
      <Body components={{ Grid, Screenshot, YouTube }} />
    </div>
  );
};

export default Item;
