import Head from "next/head";
import Image from "next/image";
import Navigation from "../../components/Navigation";
import PhotoNav from "../../components/PhotoNav";
import PageContainer from "../../components/PageContainer";
import React from "react";
import styled from "styled-components";
import { mq } from "../../config/theme";

import Spaceship from "./wyoming/wyoming-100.jpg";
import Ranchers from "./wyoming/wyoming-101.jpg";
import Jason from "./wyoming/wyoming-102.jpg";
import Trees from "./wyoming/wyoming-103.jpg";
import Dan from "./wyoming/wyoming-104.jpg";
import Lasso from "./wyoming/wyoming-105.jpg";
import StandingRock from "./wyoming/wyoming-106.jpg";
import Rodger from "./wyoming/wyoming-107.jpg";
import StainedGlass from "./wyoming/wyoming-108.jpg";
import SynagogueExterior from "./wyoming/wyoming-109.jpg";
import SynagogueStorage from "./wyoming/wyoming-100-2.jpg";
import SynagogueShelf from "./wyoming/wyoming-110.jpg";
import VoterGuide from "./wyoming/wyoming-111.jpg";
import Simon from "./wyoming/wyoming-112.jpg";
import PrayerFence from "./wyoming/wyoming-113.jpg";
import Me from "./wyoming/wyoming-114.jpg";

const images = [
  { id: "Spaceship", alt: "", src: Spaceship, className: "vertical" },
  { id: "Ranchers", alt: "", src: Ranchers, className: "vertical" },
  { id: "Jason", alt: "", src: Jason },
  { id: "Trees", alt: "", src: Trees },
  { id: "Dan", alt: "", src: Dan },
  { id: "Lasso", alt: "", src: Lasso },
  { id: "StandingRock", alt: "", src: StandingRock, className: "vertical" },
  { id: "Rodger", alt: "", src: Rodger, className: "vertical" },
  { id: "StainedGlass", alt: "", src: StainedGlass, className: "vertical" },
  { id: "Simon", alt: "", src: Simon },
  { id: "SynagogueExterior", alt: "", src: SynagogueExterior },
  { id: "SynagogueShelf", alt: "", src: SynagogueShelf },
  { id: "SynagogueStorage", alt: "", src: SynagogueStorage },
  { id: "VoterGuide", alt: "", src: VoterGuide, className: "vertical" },
  { id: "PrayerFence", alt: "", src: PrayerFence },
  { id: "Me", alt: "", src: Me, className: "vertical" },
];

const Grid = styled.div`
  display: grid;
  grid-auto-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  max-width: 2400px;
  margin: 0 auto;

  gap: 40px 20px;
  padding: 2rem;
  padding-top: 0;

  grid-template-areas:
    "Spaceship"
    "Ranchers"
    "Jason"
    "Trees"
    "Dan"
    "Lasso"
    "StandingRock"
    "Rodger"
    "StainedGlass"
    "Simon"
    "SynagogueStorage"
    "SynagogueExterior"
    "SynagogueShelf"
    "VoterGuide"
    "PrayerFence"
    "Me";
  @media (min-width: ${(props) => mq(props, "large")}) {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-raws: 1fr;
    grid-template-areas:
      "Spaceship Spaceship Spaceship Ranchers Ranchers Ranchers"
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". Jason Jason Jason Jason ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . Trees Trees Trees"
      "Dan Dan Dan Trees Trees Trees"
      "Dan Dan Dan Lasso Lasso Lasso"
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      "Rodger Rodger Rodger Rodger . ."
      "Rodger Rodger Rodger Rodger StandingRock StandingRock"
      ". . . . StandingRock StandingRock"
      ". . . . . ."
      ". . . . . ."
      "StainedGlass StainedGlass . . . ."
      "StainedGlass StainedGlass Simon Simon Simon Simon"
      "SynagogueStorage SynagogueStorage Simon Simon Simon Simon"
      ". . Simon Simon Simon Simon"
      ". . . . . ."
      ". . . . . ."
      "SynagogueShelf SynagogueShelf SynagogueShelf SynagogueExterior SynagogueExterior SynagogueExterior"
      ". . . SynagogueExterior SynagogueExterior SynagogueExterior"
      ". . . SynagogueExterior SynagogueExterior SynagogueExterior"
      ". . . SynagogueExterior SynagogueExterior SynagogueExterior"
      ". . . SynagogueExterior SynagogueExterior SynagogueExterior"
      ". . . SynagogueExterior SynagogueExterior SynagogueExterior"
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . PrayerFence PrayerFence PrayerFence PrayerFence"
      ". VoterGuide VoterGuide VoterGuide . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . . . ."
      ". . . Me Me .";
  }

  img {
    aspect-ratio: 5/4;
    object-fit: contain;
    width: 100%;
  }

  .vertical {
    aspect-ratio: 4/5;
  }
}
`;

const Header = styled.header`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

export default function Page({ doc }) {
  return (
    <div>
      <PageContainer>
        <Head>
          <title>Wyoming</title>
        </Head>
        <Navigation />
        <PhotoNav />
      </PageContainer>
      <main>
        <Header>
          <Title>Wyoming</Title>
          <h4>
            Work in progress
            <br />
            2022–ongoing
          </h4>
        </Header>

        <Grid>
          {images.map((image) => (
            <Image
              priority={true}
              alt={image.alt}
              className={image.className}
              key={image.id}
              placeholder="blur"
              sizes="100vw"
              src={image.src}
              style={{ gridArea: image.id }}
            />
          ))}
        </Grid>
      </main>
    </div>
  );
}
