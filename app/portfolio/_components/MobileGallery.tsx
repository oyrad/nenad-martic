import { Image as ImageType } from '@/types/types';
import ReactImageGallery from 'react-image-gallery';
import { makeUrl } from '@/lib/utils';
import React from 'react';

interface MobileGalleryProps {
  images: ImageType[];
  selectedImage: ImageType;
  setSelectedImage: (image: ImageType) => void;
  setImageParam: (title: string) => void;
}

export default function MobileGallery({
  images,
  selectedImage,
  setSelectedImage,
  setImageParam,
}: MobileGalleryProps) {
  return (
    <ReactImageGallery
      items={images.map((image) => ({
        original: makeUrl(image.fields.file.url),
        originalAlt: image.fields.title,
        loading: 'eager',
      }))}
      showThumbnails={false}
      showPlayButton={false}
      showFullscreenButton={false}
      showIndex={true}
      startIndex={images.indexOf(selectedImage)}
      onSlide={(index) => {
        setSelectedImage(images[index]);
        setImageParam(images[index].fields.title);
      }}
      onBeforeSlide={(index) => console.log(index)}
      additionalClass="md:hidden"
      slideDuration={200}
    />
  );
}
