import Head from "next/head";
import { useRouter } from "next/router";
import Prismic from "prismic-javascript";
import React from "react";
import styled from "styled-components";

import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import { Client, linkResolver } from "../config/prismic";
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

const Title = styled.h3``;
const Chinese = styled.span``;
const English = styled.span`
  margin-left: 0.5em;
  font-style: italic;
`;

export default function Page({ items, navigation }) {
  const router = useRouter();
  const { section } = router.query;

  return (
    <PageContainer>
      <Head>
        <title>Watching</title>
      </Head>
      <main>
        <Navigation />
        <h1>Chinese Media Log</h1>
        <Items>
          {items.map((item) => (
            <Item key={item.slug}>
              <Title>
                <Chinese>{item.titleZh}</Chinese>
                <English>({item.title})</English>
              </Title>
              <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
            </Item>
          ))}
        </Items>
      </main>
    </PageContainer>
  );
}

export async function getStaticProps({ params, req }) {
  const navigation = await Client(req).getSingle("navigation");
  const items = await getItems();
  return {
    props: {
      items,
    },
  };
}
