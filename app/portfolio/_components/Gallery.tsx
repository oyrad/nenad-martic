"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Image as ImageType } from "@/types/types";
import { makeUrl } from "@/lib/utils";
import GalleryImage from "./GalleryImage";

interface GalleryProps {
  images: ImageType[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
      <Masonry gutter="4px">
        {images.map((image, index) => (
          <GalleryImage
            key={index}
            src={makeUrl(image.fields.file.url)}
            alt={image.fields.title}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
