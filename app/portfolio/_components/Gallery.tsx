import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Image as ImageType } from "@/types/types";
import { getSlug, makeUrl } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import FadeInImage from "@/app/_components/FadeInImage";
import Image from "next/image";
import { cn } from "@/lib/utils";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface GalleryProps {
  images: ImageType[];
  slug: string;
  isConcept: boolean;
}

export default function Gallery({ images, slug, isConcept }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isImageNotFound, setIsImageNotFound] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState("");
  const router = useRouter();

  const imageParam = useSearchParams().get("image");

  useEffect(() => {
    if (imageParam) {
      const image = images.find(
        (image) => getSlug(image.fields.title) === imageParam
      );

      if (!image) {
        setIsImageNotFound(true);
        return;
      }

      setSelectedImage(image);
    }
  }, [imageParam, images]);

  useEffect(() => {
    if (!selectedImage || window.innerWidth < 768) {
      return;
    }

    const { width, height } = selectedImage?.fields.file.details.image;

    const aspectRatio = width / height;

    if (aspectRatio < 0.75) {
      setCarouselWidth("w-5/12");
    } else if (aspectRatio < 1) {
      setCarouselWidth("w-6/12");
    } else if (aspectRatio === 1) {
      setCarouselWidth("w-7/12");
    } else if (aspectRatio < 1.5) {
      setCarouselWidth("w-8/12");
    } else if (aspectRatio > 1.5) {
      setCarouselWidth("w-9/12");
    }
  }, [selectedImage]);

  if (isImageNotFound) {
    return (
      <>
        <Link
          href={isConcept ? `/portfolio/concept/${slug}` : `/portfolio/${slug}`}
          onClick={() => setIsImageNotFound(false)}
        >
          <ArrowLeft size={32} />
        </Link>
        <p>Image not found</p>
      </>
    );
  }

  return (
    <>
      {selectedImage && imageParam ? (
        <div className="fixed top-0 left-0 h-full w-full bg-background flex flex-col p-4 items-center justify-between">
          <Link
            href={
              isConcept ? `/portfolio/concept/${slug}` : `/portfolio/${slug}`
            }
            className="self-end hover:opacity-75 transition-opacity duration-200"
          >
            <X
              size={32}
              className="self-end"
              onClick={() => setSelectedImage(null)}
            />
          </Link>

          <div className="flex justify-between items-center">
            <ArrowLeft
              size={32}
              className="cursor-pointer hidden md:block"
              onClick={() => {
                if (images.indexOf(selectedImage) === 0) {
                  setSelectedImage(images[images.length - 1]);
                  return;
                }

                setSelectedImage(
                  (prevImage) => images[images.indexOf(prevImage!) - 1]
                );
              }}
            />
            <Carousel
              dynamicHeight
              infiniteLoop
              selectedItem={images.indexOf(selectedImage)}
              useKeyboardArrows
              showThumbs={false}
              showArrows={false}
              showIndicators={false}
              statusFormatter={(current, total) => `${current} / ${total}`}
              className={carouselWidth}
              onChange={(index) => {
                setSelectedImage(images[index]);
                router.replace(
                  isConcept
                    ? `/portfolio/concept/${slug}?image=${getSlug(
                        images[index].fields.title
                      )}`
                    : `/portfolio/${slug}?image=${getSlug(
                        images[index].fields.title
                      )}`
                );
              }}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={makeUrl(image.fields.file.url)}
                    alt={image.fields.title}
                    width={image.fields.file.details.image.width}
                    height={image.fields.file.details.image.height}
                  />
                </div>
              ))}
            </Carousel>
            <ArrowRight
              size={32}
              className="cursor-pointer hidden md:block"
              onClick={() => {
                if (images.indexOf(selectedImage) === images.length - 1) {
                  setSelectedImage(images[0]);
                  return;
                }

                setSelectedImage(
                  (prevImage) => images[images.indexOf(prevImage!) + 1]
                );
              }}
            />
          </div>

          <p className="text-center text-xl md:text-2xl font-light">
            {selectedImage?.fields.title}
          </p>

          {/*           <p className="text-center md:text-lg text-gray-500">
            {images.indexOf(selectedImage!) + 1} / {images.length}
          </p> */}
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
          <Masonry gutter="4px">
            {images.map((image, index) => (
              <Link
                key={index}
                href={
                  isConcept
                    ? `/portfolio/concept/${slug}?image=${getSlug(
                        image.fields.title
                      )}`
                    : `/portfolio/${slug}?image=${getSlug(image.fields.title)}`
                }
                onClick={() => setSelectedImage(image)}
                className="overflow-hidden"
              >
                <FadeInImage
                  src={makeUrl(image.fields.file.url)}
                  alt={image.fields.title}
                  className="hover:scale-110 transition-transform duration-500"
                />
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}
