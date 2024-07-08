import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image as ImageType } from '@/types/types';
import {
  getSlug,
  getUrlWithSlug,
  getUrlWithSlugAndImageParam,
  makeUrl,
} from '@/lib/utils';
import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';
import { X } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import FadeInImage from '@/app/_components/FadeInImage';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CategoryType } from '@/hooks/useCategories';
import NotFound from '@/app/_components/NotFound';
import MobileGallery from '@/app/portfolio/_components/MobileGallery';
import DesktopGallery from '@/app/portfolio/_components/DesktopGallery';

interface GalleryProps {
  images: ImageType[];
  slug: string;
  type: CategoryType;
}

export default function Gallery({ images, slug, type }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isImageNotFound, setIsImageNotFound] = useState(false);

  const router = useRouter();
  const imageParam = useSearchParams().get('image');

  useEffect(() => {
    if (imageParam) {
      const image = images.find(
        (image) => getSlug(image.fields.title).trim() === imageParam
      );

      if (!image) {
        setIsImageNotFound(true);
        return;
      }

      setSelectedImage(image);
    }
  }, [imageParam, images]);

  const setImageParam = useCallback(
    (title: string) => {
      router.replace(getUrlWithSlugAndImageParam(type, slug, title));
    },
    [router, slug, type]
  );

  if (isImageNotFound) {
    return (
      <NotFound
        text="Image not found"
        slug={slug}
        type={type}
        setIsImageNotFound={setIsImageNotFound}
      />
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

          <MobileGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setImageParam={setImageParam}
          />

          <DesktopGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setImageParam={setImageParam}
            type={type}
            slug={slug}
          />

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
                href={getUrlWithSlugAndImageParam(
                  type,
                  slug,
                  image.fields.title
                )}
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
