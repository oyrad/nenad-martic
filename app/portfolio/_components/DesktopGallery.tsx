import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { getUrlWithSlug, makeUrl } from '@/lib/utils';
import { Image as ImageType } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryType } from '@/hooks/useCategories';
import Loader from '@/app/_components/Loader';

interface DesktopGalleryProps {
  images: ImageType[];
  selectedImage: ImageType;
  setSelectedImage: any;
  setImageParam: (title: string) => void;
  slug: string;
  type: CategoryType;
}

export default function DesktopGallery({
  images,
  selectedImage,
  setSelectedImage,
  setImageParam,
  slug,
  type,
}: DesktopGalleryProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handlePreviousImage = useCallback(() => {
    if (!selectedImage) return;

    setAnimationKey((prevKey) => prevKey + 1);

    if (images.indexOf(selectedImage) === 0) {
      setSelectedImage(images[images.length - 1]);
      setImageParam(images[images.length - 1].fields.title);
      return;
    }

    setSelectedImage(
      (prevImage: ImageType) => images[images.indexOf(prevImage!) - 1]
    );
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

    setSelectedImage(
      (prevImage: ImageType) => images[images.indexOf(prevImage!) + 1]
    );
    setImageParam(images[images.indexOf(selectedImage) + 1].fields.title);
  }, [selectedImage, images, setAnimationKey, setSelectedImage, setImageParam]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousImage();
      } else if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'Escape') {
        router.push(getUrlWithSlug(type, slug));
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handlePreviousImage,
    handleNextImage,
    router,
    type,
    slug,
    setSelectedImage,
  ]);

  useEffect(() => {
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    ).then(() => setIsLoading(false));
  }, []);

  return (
    <div className="justify-between items-center flex-grow w-full overflow-hidden hidden md:flex">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <>
          <ArrowLeft
            size={40}
            className="cursor-pointer hidden md:block hover:opacity-75 transition-opacity duration=200"
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
                priority={true}
              />
            </motion.div>
          </AnimatePresence>
          <ArrowRight
            size={40}
            className="cursor-pointer hidden md:block hover:opacity-75 transition-opacity duration=200"
            onClick={handleNextImage}
          />
        </>
      )}
    </div>
  );
}
