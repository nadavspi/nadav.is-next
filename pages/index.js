import Container from "../components/Container";
import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import htmlSerializer from "../config/htmlSerializer";
import { Client } from "../config/prismic";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 40em;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 40rem) {
    justify-content: center;
  }
`;

const HomeContainer = styled.div`
  border: 1rem solid ${props => props.theme.colors.purple};
  padding: 2rem;
`;

const AlignedNav = styled(Navigation)`
  @media (min-width: 40rem) {
    align-self: flex-end;
  }
`;

const Home = ({ doc, navigation }) => (
  <>
    <Head>
      <title>Nadav Spiegelman</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Main>
      <HomeContainer>
        <RichText render={doc.data.content} htmlSerializer={htmlSerializer} />
      </HomeContainer>
      <AlignedNav doc={navigation} home />
    </Main>
  </>
);

export async function getStaticProps(context) {
  const { req } = context;
  const doc = await Client(req).getSingle("home");
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      doc,
      navigation
    }
  };
}

export default Home;
