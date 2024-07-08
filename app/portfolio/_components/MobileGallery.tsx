import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { makeUrl } from '@/lib/utils';
import { Image as ImageType } from '@/types/types';

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
    <Carousel
      dynamicHeight
      infiniteLoop
      selectedItem={images.indexOf(selectedImage)}
      useKeyboardArrows={false}
      showThumbs={false}
      showArrows={false}
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
    </Carousel>
  );
}
