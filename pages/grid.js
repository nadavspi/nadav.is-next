import Head from "next/head";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import React from "react";
import styled from "styled-components";
import { mq } from "../config/theme";

const Header = styled.header`
  margin-bottom: 0;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  padding: 2rem;

  @media (min-width: ${(props) => mq(props)}) {
  }

  img {
    max-height: 90vh;
  }
`;

export default function Page({ doc, navigation }) {
  return (
    <div>
      <PageContainer>
        <Head>
          <title>Grid</title>
        </Head>
        <Navigation />
      </PageContainer>
      <main>
        <Grid>
          <Header>
            <Title>Andy Miller</Title>
            <h4>Painter, Neighbor</h4>

            <h4>
              Brooklyn, NY
              <br />
              <time>January 2021</time>
            </h4>
          </Header>
          <img
            src="https://images.prismic.io/nadavis/8fb6b784-fbc5-49f6-8d17-23dd6349ace0_2021-12-13-0001.jpg?auto=compress,format"
            alt=""
          />

          <img
            src="https://images.prismic.io/nadavis/2fb02bb5-985a-423c-922d-1fc29d147deb_2021-12-13-0001-2.jpg?auto=compress,format"
            alt=""
          />
          <img
            src="https://images.prismic.io/nadavis/d7f9c68f-bb08-46e1-bad8-be8a38941b32_2021-12-15-0001-3.jpg?auto=compress,format"
            alt=""
          />
          <img
            src="https://images.prismic.io/nadavis/61e6613d-607f-40ea-91fb-dfdd25ae90fb_2022-06-19-0009.jpg?auto=compress,format"
            alt=""
          />
          <img
            src="https://images.prismic.io/nadavis/a9bd1863-5d06-40fa-8f15-b5b57ceb318a_2019-01-21-0041.jpg?auto=compress,format"
            alt=""
          />
          <img
            src="https://images.prismic.io/nadavis/d74c7ea2-2172-4afe-99d0-aadff2206d5b_2021-12-15-0002-2.jpg?auto=compress,format"
            alt=""
          />
        </Grid>
      </main>
    </div>
  );
}
