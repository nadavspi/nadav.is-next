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

  @media (min-width: ${(props) => mq(props)}) {
    justify-content: center;
  }
`;

const HomeContainer = styled.div`
  border: 1rem solid ${(props) => props.theme.colors.purple};
  padding: 2rem;
`;

const Home = ({ doc, navigation }) => (
  <>
    <Head>
      <title>Nadav Spiegelman</title>
    </Head>

    <Main>
      <HomeContainer>
        <h2>My name is Nadav Spiegelman.</h2>
        <p>I am...</p>
        <ul>
          <li>
            <Link href="/photography">
              <a href="/photography">Photographer</a>
            </Link>
          </li>
          <li>Queer</li>
          <li>Computer geek</li>
          <li>Jazz fan &amp; (formerly professional) musician</li>
          <li>Israeli &amp; American &amp; neither </li>
          <li>
            <Link href="/reading">
              <a href="/reading">Reader</a>
            </Link>
          </li>
          <li>
            Student
            <ul>
              <li>Mandarin Chinese</li>
              <li>History of the AIDS epidemic</li>
              <li>Psychology</li>
              <li>Meditation</li>
              <li>Buddhisms</li>
              <li>Yoga</li>
            </ul>
          </li>
          <li>Diarist</li>
          <li>Cook</li>
          <li>
            Collector
            <ul>
              <li>Fountain pens</li>
              <li>Photo books</li>
              <li>Tea</li>
              <li>Watches</li>
            </ul>
          </li>
          <li>D&amp;D player</li>
          <li>Polyamorous</li>
          <li>Coffee aficionado</li>
          <li>Darkroom printer</li>
          <li>Picture framer</li>
          <li>Note taker</li>
          <li>Fan of bulleted lists</li>
        </ul>
      </HomeContainer>
      <Navigation doc={navigation} home />
    </Main>
  </>
);

export async function getStaticProps(context) {
  const { req } = context;
  const navigation = await Client(req).getSingle("navigation");
  return {
    props: {
      navigation,
    },
  };
}

export default Home;
