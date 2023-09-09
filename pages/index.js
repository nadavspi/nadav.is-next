import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

import Container from "../components/Container";
import Navigation from "../components/Navigation";
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
      <Navigation home />
      <HomeContainer>
        <h2>My name is Nadav Spiegelman.</h2>
        <p>I am...</p>
        <ul>
          <li>
            <Link href="/photography/artists">Photographer</Link>
          </li>
          <li>Queer</li>
          <li>Computer geek</li>
          <li>Jazz fan &amp; (formerly professional) musician</li>
          <li>Israeli &amp; American &amp; neither </li>
          <li>
            <Link href="/reading">Reader</Link>
          </li>
          <li>
            Student
            <ul>
              <li>
                <Link href="/watching">Mandarin Chinese</Link>
              </li>
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
    </Main>
  </>
);

export default Home;
