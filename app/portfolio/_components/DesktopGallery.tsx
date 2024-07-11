import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { getUrlWithSlug, makeUrl } from '@/lib/utils';
import { Image as ImageType } from '@/types/types';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryType } from '@/hooks/useCategories';
import ReactImageGallery from 'react-image-gallery';

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
  const router = useRouter();

  const handlePreviousImage = useCallback(() => {
    if (!selectedImage) return;

    if (images.indexOf(selectedImage) === 0) {
      setSelectedImage(images[images.length - 1]);
      setImageParam(images[images.length - 1].fields.title);
      return;
    }

    setSelectedImage(
      (prevImage: ImageType) => images[images.indexOf(prevImage!) - 1]
    );
    setImageParam(images[images.indexOf(selectedImage) - 1].fields.title);
  }, [selectedImage, images, setSelectedImage, setImageParam]);

  const handleNextImage = useCallback(() => {
    if (!selectedImage) return;

    if (images.indexOf(selectedImage) === images.length - 1) {
      setSelectedImage(images[0]);
      setImageParam(images[0].fields.title);
      return;
    }

    setSelectedImage(
      (prevImage: ImageType) => images[images.indexOf(prevImage!) + 1]
    );
    setImageParam(images[images.indexOf(selectedImage) + 1].fields.title);
  }, [selectedImage, images, setSelectedImage, setImageParam]);

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

  return (
    <div className="justify-between items-center flex-grow overflow-hidden w-full hidden md:flex gap-8">
      <ArrowLeft
        size={40}
        className="cursor-pointer hidden md:block hover:opacity-75 transition-opacity duration-200 min-w-12 max-w-12"
        onClick={handlePreviousImage}
      />
      <ReactImageGallery
        items={images.map((image) => ({
          original: makeUrl(image.fields.file.url),
          originalAlt: image.fields.title,
          loading: 'eager',
        }))}
        showThumbnails={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex={false}
        showNav={false}
        startIndex={images.indexOf(selectedImage)}
        additionalClass="cursor-auto"
        onSlide={(index) => {
          setSelectedImage(images[index]);
          setImageParam(images[index].fields.title);
        }}
        slideDuration={200}
      />
      <ArrowRight
        size={40}
        className="cursor-pointer hidden md:block hover:opacity-75 transition-opacity duration-200 min-w-12 max-w-12"
        onClick={handleNextImage}
      />
    </div>
  );
}
