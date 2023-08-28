import React from "react";
import Image from "next/image";

const Screenshot = ({ alt, src, width = 1920, height = 1080 }) => {
  return <Image src={`https://nadav-website.s3.us-west-001.backblazeb2.com/${src}`} alt={alt} width={width} height={height} />;
};

export default Screenshot;
