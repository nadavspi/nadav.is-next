import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/Navigation";
import PageContainer from "../components/PageContainer";
import React, { useState } from "react";
import styled from "styled-components";

import Welcome from "./home/welcome.gif";
import WelcomeStatic from "./home/welcome-static.gif";
import WatchingGrid from "../components/watching/Grid";
import Screenshot from "../components/watching/Screenshot";
import Spaceship from "./photography/wyoming/wyoming-100.jpg";
import Andy from "./photography/andy-miller/andy-miller-101.jpg";
import Eric from "./photography/eric-goldberg/eric-goldberg-7.jpg";

const Section = styled.section`
  margin-top: 4rem;
`;
const Photos = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "Spaceship Eric"
    "Spaceship Andy";
`;
const Parenthetical = styled.h4`
  margin-top: 1rem;
  max-width: 30rem;
`;

const About = ({ doc, navigation }) => {
  const [animationDisabled, setAnimationDisabled] = useState(false);

  const photos = [
    {
      alt: "A church that looks like a weird spaceship",
      id: "Spaceship",
      src: Spaceship,
      href: "/photography/wyoming",
    },
    {
      id: "Andy",
      alt: "Portrait of Andy Miller in his kitchen",
      src: Andy,
      href: "/photography/andy-miller",
    },
    {
      id: "Eric",
      src: Eric,
      alt: "Portrait of Eric Goldberg",
      href: "/photography/eric-goldberg",
    },
  ];

  return (
    <PageContainer>
      <Head>
        <title>Nadav Spiegelman</title>
      </Head>

      <main>
        <Navigation />

        <Image
          src={animationDisabled ? WelcomeStatic : Welcome}
          alt="Welcome to my Homepage!"
        />
        <button
          type="button"
          onClick={() => setAnimationDisabled(!animationDisabled)}
        >
          {animationDisabled ? "Enable" : "Disable"} animation
        </button>

        <Parenthetical>
          (I don&rsquo;t remember what my first website looked like, but it{" "}
          <em>probably</em> had something like that.)
        </Parenthetical>

        <Section>
          <Link href="/photography">
            <h3>My photography</h3>
          </Link>
          <Photos>
            {photos.map((image) => (
              <Link
                href={image.href}
                key={image.id}
                style={{ gridArea: image.id }}
              >
                <Image
                  alt={image.alt}
                  placeholder="blur"
                  sizes="50vw"
                  src={image.src}
                />
              </Link>
            ))}
          </Photos>
        </Section>

        <Section>
          <Link href="/watching">
            <h3>Things I&rsquo;m watching</h3>
          </Link>
          <WatchingGrid>
            <Link href="/watching">
              <Screenshot
                src="still-life/Still Life (2006) 01:38:25.jpg"
                alt="Couple in half-demolished building"
              />
            </Link>
            <Link href="/watching">
              <Screenshot
                src="dearest/Dearest (2014) 01:18:06.jpg"
                alt="Construction workers' dorm"
                width="1920"
                height="816"
              />
            </Link>
          </WatchingGrid>
        </Section>

        <Section>
          <Link href="/reading">
            <h3 style={{ marginBottom: 0 }}>Things I&rsquo;m reading</h3>
          </Link>
          <Parenthetical>
            (but also not really because a lot of my reading these days is in
            Chinese which isn&rsquo;t represented here)
          </Parenthetical>
        </Section>
      </main>
    </PageContainer>
  );
};

export default About;
