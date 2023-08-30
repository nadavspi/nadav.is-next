import React from "react";
import Image from "next/image";
import theme from "../../config/theme";

const Screenshot = ({
  alt,
  height = 1080,
  sizes = `(min-width: ${theme.breakpoints.large}) 50vw, 100vw`,
  src,
  width = 1920,
}) => {
  return (
    <Image
      alt={alt}
      height={height}
      sizes={sizes}
      src={`https://nadav-website.s3.us-west-001.backblazeb2.com/${src}`}
      width={width}
    />
  );
};

export default Screenshot;
