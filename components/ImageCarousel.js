import React from "react";
import Carousel from "react-image-gallery";
import styled from "styled-components";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.fontSizes[8]};
`;

const ImageCarousel = ({ items }) => {
  const images = items.map((item) => {
    const { image } = item;
    return {
      original: image.url,
      thumbnail: image.thumbnail.url,
    };
  });
  return (
    <Container>
      <Carousel items={images} />
    </Container>
  );
};

export default ImageCarousel;
