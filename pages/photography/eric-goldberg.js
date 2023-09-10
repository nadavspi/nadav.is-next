import Head from "next/head";
import Image from "next/image";
import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import PhotoNav from "../../components/PhotoNav";
import React from "react";
import styled from "styled-components";
import { mq } from "../../config/theme";

import WipingCloseup from "./eric-goldberg/eric-goldberg-1.jpg";
import Wiping from "./eric-goldberg/eric-goldberg-2.jpg";
import Press from "./eric-goldberg/eric-goldberg-3.jpg";
import PlateCloseup from "./eric-goldberg/eric-goldberg-4.jpg";
import PlateAndPrint from "./eric-goldberg/eric-goldberg-5.jpg";
import Prints from "./eric-goldberg/eric-goldberg-6.jpg";
import Portrait from "./eric-goldberg/eric-goldberg-7.jpg";

const Grid = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "image-1"
    "text-1"
    "text-2"
    "image-2"
    "image-3"
    "image-4"
    "image-5"
    "image-6"
    "image-7";
  grid-auto-columns: 1fr;
  align-items: center;
  max-width: 2800px;
  margin: 0 auto;

  gap: 40px;
  padding: 2rem;
  padding-top: 0;

  @media (min-width: ${(props) => mq(props, "large")}) {
    grid-template-areas:
      "header header"
      "image-1 image-1"
      "image-2 text-1"
      "text-2 image-3"
      "image-4 image-5"
      "image-6 image-7";
  }
  @media (min-width: ${(props) => mq(props, "xlarge")}) {
    grid-template-areas:
      "image-1 image-1 image-1 header"
      ".. text-1 text-2 .."
      "image-2 image-2 image-3 image-3"
      "image-4 image-4 image-5 image-5"
      "image-6 image-6 image-7 image-7";

    .text {
      align-self: start;
    }
  }

  img {
    aspect-ratio: 3/2;
    object-fit: contain;
    width: 100%;
  }
  p {
    margin: 0;
    @media (min-width: ${(props) => mq(props, "xlarge")}) {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }
  .text-1 {
    grid-area: text-1;
  }
  .text-2 {
    grid-area: text-2;
  }
  .image-1 {
    grid-area: image-1;
  }
  .image-2 {
    grid-area: image-2;
  }
  .image-3 {
    grid-area: image-3;
  }
  .image-4 {
    grid-area: image-4;
  }
  .image-5 {
    grid-area: image-5;
  }
  .image-6 {
    grid-area: image-6;
  }
  .image-7 {
    grid-area: image-7;
  }
  .image-8 {
    grid-area: image-8;
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
          <title>Eric Goldberg</title>
        </Head>
        <Navigation />
        <PhotoNav />
      </PageContainer>
      <main>
        <Grid>
          <Header>
            <Title>Eric Goldberg</Title>
            <h4>Painter &amp; Printmaker</h4>

            <h4>
              Philadelphia, PA
              <br />
              <time>January 2019</time>
            </h4>
          </Header>
          <Image
            sizes="100vw"
            src={Portrait}
            alt=""
            className="image-1"
            placeholder="blur"
          />
          <p className="text text-1">
            I photographed{" "}
            <a href="https://www.ericgoldberg.net/">Eric Goldberg</a> during his{" "}
            <a href="https://6abc.com/philadelphia-art-of-aging-artist-in-residence-eric-goldberg/5149141/">
              residency
            </a>{" "}
            at the{" "}
            <a href="https://www.barnesfoundation.org/">Barnes Foundation</a>.
            He was 72 years old at the time. Eric died in 2021.
          </p>
          <p className="text text-2">
            I was in Philly for the{" "}
            <a href="https://phillypenshow.com/">pen show</a>, and I always walk
            to the Barnes when I&rsquo;m there. It turned out that Eric was into
            pens too, and was interested in the show. I wonder if he ended up
            going.
          </p>
          <Image
            sizes="100vw"
            className="image-2"
            placeholder="blur"
            src={WipingCloseup}
            alt=""
          />
          <Image
            sizes="100vw"
            className="image-3"
            placeholder="blur"
            src={Wiping}
            alt=""
          />
          <Image
            sizes="100vw"
            className="image-4"
            placeholder="blur"
            src={Press}
            alt=""
          />
          <Image
            sizes="100vw"
            className="image-5"
            placeholder="blur"
            src={PlateCloseup}
            alt=""
          />
          <Image
            sizes="100vw"
            className="image-6"
            placeholder="blur"
            src={PlateAndPrint}
            alt=""
          />
          <Image
            sizes="100vw"
            className="image-7"
            placeholder="blur"
            src={Prints}
            alt=""
          />
        </Grid>
      </main>
    </div>
  );
}
