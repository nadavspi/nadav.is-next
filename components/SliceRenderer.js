import React from "react";
import ImageGallery from "./ImageGallery";

const SliceRenderer = ({ className, doc }) => {
  return doc.data.body.map((slice, i) => {
    const imageGallery = ["nadav_s_image_gallery", "staggered_image_gallery"];
    if (imageGallery.includes(slice.slice_type)) {
      return <ImageGallery className={className} items={slice.items} key={i} />;
    }

    return null;
  });
};

export default SliceRenderer;
