import Head from "next/head";
import Link from "next/link";
import PageContainer from "../components/PageContainer";
import Navigation from "../components/Navigation";

const About = ({ doc, navigation }) => (
  <PageContainer>
    <Head>
      <title>Who?</title>
    </Head>

    <main>
      <Navigation />

      <h1>I am...</h1>
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
    </main>
  </PageContainer>
);

export default About;
