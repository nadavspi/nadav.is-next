import Filter from "../components/watching/Filter";
import Head from "next/head";
import ItemRenderer from "../components/watching/Item"
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import React, { useState } from "react";
import styled from "styled-components";
import { allMedia } from "contentlayer/generated";

const Items = styled.ul`
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const ItemContainer = styled.li`
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: ${(props) => props.theme.border} solid
    ${(props) => props.theme.colors.mutedorange};
`;

const Title = styled.h3`
  margin-bottom: 0;
`;
const Chinese = styled.div``;
const English = styled.div`
  font-style: italic;
`;

const Metadata = styled.div``;

export default function Page({ navigation }) {
  const allFilters = ["Movie", "TV"];
  const [currentFilter, setFilter] = useState(allFilters);

  const items = allMedia
    .filter((item) => currentFilter.includes(item.category))
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return (
    <PageContainer>
      <Head>
        <title>Watching</title>
      </Head>
      <main>
        <Navigation />
        <h1>Chinese Media Log</h1>
        <Filter
          allFilters={allFilters}
          currentFilter={currentFilter}
          setFilter={setFilter}
        />
        <Items>
          {items.map((item, idx) => {
            return (
              <ItemContainer key={idx}>
                <ItemRenderer item={item} />
              </ItemContainer>
            );
          })}
        </Items>
      </main>
    </PageContainer>
  );
}
