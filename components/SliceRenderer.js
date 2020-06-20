import React from "react";
import ImageGallery from "./ImageGallery";

const SliceRenderer = ({ doc }) => {
  return doc.data.body.map((slice, i) => {
    if (slice.slice_type === "staggered_image_gallery") {
      return <ImageGallery items={slice.items} key={i} />;
    }

    return null;
  });
};

export default SliceRenderer;
