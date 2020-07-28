import ImageCarousel from "./ImageCarousel";
import ImageGallery from "./ImageGallery";
import React from "react";

const SliceRenderer = ({ className, doc }) => {
  return doc.data.body.map((slice, i) => {
    const imageGallery = ["nadav_s_image_gallery", "staggered_image_gallery"];
    if (imageGallery.includes(slice.slice_type)) {
      return <ImageGallery className={className} items={slice.items} key={i} />;
    }

    if (slice.slice_type === "image_carousel") {
      return (
        <ImageCarousel className={className} items={slice.items} key={i} />
      );
    }

    return null;
  });
};

export default SliceRenderer;
