import Head from "next/head";
import Image from "next/image";
import Navigation from "../../components/Navigation";
import PhotoNav from "../../components/PhotoNav";
import PageContainer from "../../components/PageContainer";
import React from "react";
import styled from "styled-components";
import { mq } from "../../config/theme";

import Outside from "./andy-miller/andy-miller-100.jpg";
import Kitchen from "./andy-miller/andy-miller-101.jpg";
import StudioPortrait from "./andy-miller/andy-miller-102.jpg";
import CinderBlocks from "./andy-miller/andy-miller-103.jpg";
import Storage from "./andy-miller/andy-miller-104.jpg";
import GardenPortrait from "./andy-miller/andy-miller-105.jpg";
import Poem from "./andy-miller/resnick-poem.jpg";

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "photo-kitchen"
    "text-irene"
    "text-esmeralda"
    "photo-outside"
    "photo-studio-portrait"
    "photo-cinderblocks"
    "photo-storage"
    "photo-garden"
    "text-milton"
    "photo-poem"
    "text-poem";
  grid-auto-columns: 1fr 1fr;
  align-items: center;
  max-width: 2000px;
  margin: 0 auto;

  gap: 40px;
  padding: 2rem;
  padding-top: 0;

  @media (min-width: ${(props) => mq(props, "large")}) {
    grid-template-areas:
      "header header"
      "photo-kitchen photo-kitchen"
      ".. text-irene"
      "text-esmeralda photo-outside"
      "photo-studio-portrait photo-cinderblocks"
      "photo-storage photo-garden"
      "text-milton .."
      "photo-poem text-poem";
  }
  @media (min-width: ${(props) => mq(props, "xlarge")}) {
    grid-template-areas:
      "photo-kitchen photo-kitchen photo-kitchen header"
      "photo-kitchen photo-kitchen photo-kitchen text-irene"
      "text-esmeralda photo-outside photo-outside photo-outside"
      "photo-studio-portrait photo-studio-portrait photo-cinderblocks photo-cinderblocks"
      "photo-storage photo-storage photo-garden photo-garden"
      ". . . ."
      ".. text-milton text-milton .."
      ". . . ."
      "photo-poem photo-poem text-poem text-poem";

    .text {
      align-self: start;
    }
  }

  img {
    aspect-ratio: 5/4;
    object-fit: contain;
    width: 100%;
  }
  .vertical {
    aspect-ratio: 4 / 5;
  }
  p {
    margin: 0;
  }
  p + p {
    margin-top: 1.5rem;
  }
  .text-irene {
    grid-area: text-irene;
  }
  .photo-kitchen {
    grid-area: photo-kitchen;
  }
  .text-esmeralda {
    grid-area: text-esmeralda;
    align-self: start;
  }
  .text-milton {
    grid-area: text-milton;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: ${(props) => props.theme.border} solid ${(props) =>
      props.theme.colors.purple};

  }
  .photo-poem {
    grid-area: photo-poem;
  }
  .photo-outside {
    grid-area: photo-outside;
  }
  .photo-studio-portrait {
    grid-area: photo-studio-portrait;
  }
  .photo-cinderblocks {
    grid-area: photo-cinderblocks;
  }
  .photo-storage {
    grid-area: photo-storage;
  }
  .photo-garden {
    grid-area: photo-garden;
  }
}
`;

const TextPoem = styled.p`
  grid-area: text-poem;
  line-height: 2;
  justify-self: center;
  padding: 3rem;
  border: 1rem solid ${(props) => props.theme.colors.purple};

  @media (min-width: ${(props) => mq(props, "large")}) {
    padding: 4rem;
  }
  @media (min-width: ${(props) => mq(props, "xlarge")}) {
    padding: 6rem;
  }

  em {
    display: block;
    margin-top: 1rem;
  }
`;
const Header = styled.header`
  margin-bottom: 0;
  grid-area: header;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

export default function Page({ doc }) {
  return (
    <div>
      <PageContainer>
        <Head>
          <title>Andy Miller</title>
        </Head>
        <Navigation />
        <PhotoNav />
      </PageContainer>
      <main>
        <Grid>
          <Header>
            <Title>Andy Miller</Title>
            <h4>Painter &amp; Neighbor</h4>

            <h4>
              Brooklyn, NY
              <br />
              <time>2021</time>
            </h4>
          </Header>
          <Image
            sizes="100vw"
            priority="true"
            src={Kitchen}
            alt="Portrait of Andy in his kitchen"
            className="photo-kitchen"
            placeholder="blur"
          />
          <p className="text-irene">
            Andy, who&rsquo;s been living in New York City since 1968, moved
            into his current home in the neighborhood in 1994 with his wife,
            Irene (pictured on the wall, as a baby). Irene died in 2014.
          </p>
          <p className="text-esmeralda">
            We met in July 2021 when Andy was heading out for a walk with his
            dog, Esmeralda, and I was photographing on his street. Esmeralda
            developed extensive cancer and was euthanized at home on August 6,
            2023 surrounded by friends.
          </p>
          <Image
            sizes="100vw"
            priority="true"
            src={Outside}
            alt="Andy outside of his home with Esmeralda"
            className="photo-outside"
            placeholder="blur"
          />

          <Image
            sizes="100vw"
            priority="true"
            src={StudioPortrait}
            alt="Andy in his studio"
            className="photo-studio-portrait vertical"
            placeholder="blur"
          />
          <Image
            sizes="100vw"
            priority="true"
            src={CinderBlocks}
            alt="An in-progress painting resting on cinderblocks"
            className="photo-cinderblocks vertical"
            placeholder="blur"
          />
          <Image
            sizes="100vw"
            priority="true"
            src={Storage}
            alt="Stacks of paintings"
            className="photo-storage vertical"
            placeholder="blur"
          />
          <Image
            sizes="100vw"
            priority="true"
            src={GardenPortrait}
            alt="Andy in his garden"
            className="photo-garden vertical"
            placeholder="blur"
          />
          <div className="text-milton">
            <p>
              Through Andy, I learned about Milton Resnick and Pat Passlof, a
              married couple and lesser known abstract expressionists from the
              mid-20th century New York scene.
            </p>
            <p>
              {" "}
              From 1976 until his death in 2004, Milton Resnick lived and
              painted in an old synagogue building on Eldridge Street. Andy says
              the building was a sanctuary from the madness of the city, and
              that they used to make oil paints in the basement (with wholly
              inadequate ventilation). These days,{" "}
              <a href="https://www.resnickpasslof.org/">
                The Milton Resnick and Pat Passlof Foundation
              </a>{" "}
              holds exhibits in the building.
            </p>
          </div>
          <Image
            sizes="100vw"
            priority="true"
            src={Poem}
            alt=""
            className="photo-poem vertical"
            placeholder="blur"
          />

          <TextPoem>
            in the painting room
            <br />
            you forget pain
            <br />
            the spirit climbs <br />
            you judge goddesses
            <br />
            how different a tree looks
            <br />
            the abstract way
            <em>(poem by Milton Resnick)</em>
          </TextPoem>
        </Grid>
      </main>
    </div>
  );
}
