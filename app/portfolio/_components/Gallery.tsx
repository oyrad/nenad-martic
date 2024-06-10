import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Image as ImageType } from "@/types/types";
import {
  getSlug,
  getUrlWithSlug,
  getUrlWithSlugAndImageParam,
  makeUrl,
} from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import FadeInImage from "@/app/_components/FadeInImage";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import BackArrow from "@/app/_components/BackArrow";
import { CategoryType } from "@/hooks/useCategories";

interface GalleryProps {
  images: ImageType[];
  slug: string;
  type: CategoryType;
}

export default function Gallery({ images, slug, type }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isImageNotFound, setIsImageNotFound] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const router = useRouter();

  const imageParam = useSearchParams().get("image");

  useEffect(() => {
    if (imageParam) {
      const image = images.find(
        (image) => getSlug(image.fields.title).trim() === imageParam
      )

      if (!image) {
        setIsImageNotFound(true)
        return
      }

      setSelectedImage(image)
    }
  }, [imageParam, images])

  const setImageParam = useCallback(
    (title: string) => {
      router.replace(getUrlWithSlugAndImageParam(type, slug, title));
    },
    [router, slug, type],
  );

  const handlePreviousImage = useCallback(() => {
    if (!selectedImage) return;

    setAnimationKey((prevKey) => prevKey + 1);

    if (images.indexOf(selectedImage) === 0) {
      setSelectedImage(images[images.length - 1]);
      setImageParam(images[images.length - 1].fields.title);
      return;
    }

    setSelectedImage((prevImage) => images[images.indexOf(prevImage!) - 1]);
    setImageParam(images[images.indexOf(selectedImage) - 1].fields.title);
  }, [selectedImage, images, setAnimationKey, setSelectedImage, setImageParam]);

  const handleNextImage = useCallback(() => {
    if (!selectedImage) return;

    setAnimationKey((prevKey) => prevKey + 1);

    if (images.indexOf(selectedImage) === images.length - 1) {
      setSelectedImage(images[0]);
      setImageParam(images[0].fields.title);
      return;
    }

    setSelectedImage((prevImage) => images[images.indexOf(prevImage!) + 1]);
    setImageParam(images[images.indexOf(selectedImage) + 1].fields.title);
  }, [selectedImage, images, setAnimationKey, setSelectedImage, setImageParam]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePreviousImage, handleNextImage]);

  if (isImageNotFound) {
    return (
      <>
        <p className="md:text-xl mb-2 font-light uppercase">Image not found</p>

        <Link
          href={getUrlWithSlug(type, slug)}
          onClick={() => setIsImageNotFound(false)}
          className="flex gap-2 items-center"
        >
          <BackArrow />

          <p>Return to {slug.replace("-", " ")}</p>
        </Link>
      </>
    );
  }

  return (
    <>
      {selectedImage && imageParam ? (
        <div className="fixed top-0 left-0 h-full w-full bg-background flex flex-col p-4 items-center gap-4 md:gap-0 md:justify-between">
          <Link
            href={getUrlWithSlug(type, slug)}
            className="self-end hover:opacity-75 transition-opacity duration-200"
          >
            <X
              size={32}
              className="self-end"
              onClick={() => setSelectedImage(null)}
            />
          </Link>

          <Carousel
            dynamicHeight
            infiniteLoop
            selectedItem={images.indexOf(selectedImage)}
            useKeyboardArrows
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            statusFormatter={(current, total) => `${current} / ${total}`}
            className="md:hidden"
            onChange={(index) => {
              setSelectedImage(images[index])
              setImageParam(images[index].fields.title)
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

          <div className="justify-between items-center flex-grow w-full overflow-hidden hidden md:flex">
            <ArrowLeft
              size={40}
              className="cursor-pointer hidden md:block hover:opacity-75 transition-opacity duration-200"
              onClick={handlePreviousImage}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={animationKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative h-full w-full flex justify-center items-center overflow-hidden p-4"
              >
                <Image
                  src={makeUrl(selectedImage.fields.file.url)}
                  alt={selectedImage.fields.title}
                  width={selectedImage.fields.file.details.image.width}
                  height={selectedImage.fields.file.details.image.height}
                  className="max-h-full max-w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <ArrowRight
              size={40}
              className="cursor-pointer hidden md:block hover:opacity-75 transition-opacity duration-200"
              onClick={handleNextImage}
            />
          </div>

          <p className="text-center text-xl md:text-2xl font-light md:mb-2">
            {selectedImage?.fields.title}
          </p>

          <p className="text-center md:text-lg text-gray-500 hidden md:block">
            {images.indexOf(selectedImage!) + 1} / {images.length}
          </p>
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
