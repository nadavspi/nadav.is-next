import React from "react";
import Carousel from "react-image-gallery";

const ImageCarousel = ({ items }) => {
  const images = items.map((item) => {
    const { image } = item;
    return {
      original: image.url,
      thumbnail: image.thumbnail.url,
    };
  });
  return <Carousel items={images} />;
};

export default ImageCarousel;
