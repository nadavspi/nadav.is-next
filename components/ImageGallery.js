import LazyLoad from "react-lazyload";
import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "../config/prismic";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.fontSizes[8]};
  padding-top: ${({ theme }) => theme.fontSizes[8]};
  border-top: ${({ theme }) => theme.border} solid
    ${({ theme }) => theme.colors.purple};
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
      {items.map(({ caption, image }, index) => (
        <LazyLoad once>
          <Figure key={index}>
            <img src={image.url} alt={image.alt} key={image.alt} />
            {caption && (
              <figcaption>
                <RichText render={caption} linkResolver={linkResolver} />
              </figcaption>
            )}
          </Figure>
        </LazyLoad>
      ))}
    </Container>
  );
};

export default ImageGallery;
