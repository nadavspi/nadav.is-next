import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../config/prismic";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.fontSizes[8]};
  padding-top: ${({ theme }) => theme.fontSizes[8]};
  border-top: 0.5rem solid ${({ theme }) => theme.colors.purple};
`;

const Figure = styled.figure`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.fontSizes[6]};
  font-style: italic;

  p {
    margin: 0;
  }
`;

const ImageGallery = ({ items }) => {
  return (
    <Container>
      {items.map(({ caption, image }) => (
        <Figure>
          <img src={image.url} alt={image.alt} key={image.alt} />
          <figcaption>
            <RichText render={caption} linkResolver={linkResolver} />
          </figcaption>
        </Figure>
      ))}
    </Container>
  );
};

export default ImageGallery;
