import React from "react";
import Carousel from "react-image-gallery";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.fontSizes[8]};
`;

const ImageCarousel = ({ items, sectionId }) => {
  const router = useRouter();
  const { section } = router.query;
  if (!section || section[0] !== sectionId) {
    return null;
  }

  const images = items.map((item) => {
    const { image } = item;
    return {
      original: image.url,
      thumbnail: image.thumbnail.url,
    };
  });
  return (
    <Container>
      <Carousel
        items={images}
        lazyLoad={true}
        showIndex={true}
        showPlayButton={false}
        showThumbnails={false}
      />
    </Container>
  );
};

export default ImageCarousel;
