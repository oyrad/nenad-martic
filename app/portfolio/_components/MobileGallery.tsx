import { Image as ImageType } from '@/types/types';
import ReactImageGallery from 'react-image-gallery';
import { makeUrl } from '@/lib/utils';
import React from 'react';

import './../../../node_modules/react-image-gallery/styles/css/image-gallery.css';

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
      additionalClass="md:hidden"
      slideDuration={200}
    />
    /*<Carousel
      dynamicHeight
      infiniteLoop
      selectedItem={images.indexOf(selectedImage)}
      useKeyboardArrows={false}
      showThumbs={false}
      showArrows={true}
      swipeable={false}
      showIndicators={false}
      statusFormatter={(current, total) => `${current} / ${total}`}
      className="md:hidden"
      onChange={(index) => {
        setSelectedImage(images[index]);
        setImageParam(images[index].fields.title);
      }}
    >
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={makeUrl(image.fields.file.url)}
            alt={image.fields.title}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}
            priority={true}
          />
        </div>
      ))}
    </Carousel>*/
  );
}
