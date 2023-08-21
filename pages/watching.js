import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";

import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import Filter from "../components/watching/Filter";
import { getItems } from "../lib/watching";

const Items = styled.ul`
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
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

export default function Page({ items, navigation }) {
  const allFilters = ["Movie", "TV"];
  const [currentFilter, setFilter] = useState(allFilters);

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
          {items
            .filter((item) => currentFilter.includes(item.type))
            .sort((a, b) => {
              if (a.date < b.date) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((item) => (
              <Item key={item.slug}>
                <Title>
                  <Chinese>{item.titleZh}</Chinese>
                  <English>{item.title}</English>
                </Title>
                <Metadata>
                  {item.year}, {item.type}
                </Metadata>
                <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
              </Item>
            ))}
        </Items>
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const items = await getItems();
  return {
    props: {
      items,
    },
  };
}
