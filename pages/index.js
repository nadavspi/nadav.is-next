import Container from "../components/Container";
import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import htmlSerializer from "../config/htmlSerializer";
import styled from "styled-components";
import { Client } from "../config/prismic";
import { RichText } from "prismic-reactjs";
import { mq } from "../config/theme";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-width: 40em;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: ${props => mq(props)}) {
    justify-content: center;
  }
`;

const HomeContainer = styled.div`
  border: 1rem solid ${props => props.theme.colors.purple};
  padding: 2rem;
`;

const Home = ({ doc, navigation }) => (
  <>
    <Head>
      <title>Nadav Spiegelman</title>
    </Head>

    <Main>
      <HomeContainer>
        <RichText render={doc.data.content} htmlSerializer={htmlSerializer} />
      </HomeContainer>
        <Navigation doc={navigation} home />
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
