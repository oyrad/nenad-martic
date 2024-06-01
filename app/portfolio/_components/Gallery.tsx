import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Image as ImageType } from "@/types/types";
import { getSlug, makeUrl } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, ArrowLeft } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useRouter } from "next/navigation";
import "react-image-gallery/styles/css/image-gallery.css";
import FadeInImage from "@/app/_components/FadeInImage";

interface GalleryProps {
  images: ImageType[];
  slug: string;
  isConcept: boolean;
}

export default function Gallery({ images, slug, isConcept }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isImageNotFound, setIsImageNotFound] = useState(false);
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
        <div className="fixed top-0 left-0 h-full w-full bg-background flex flex-col p-4">
          <X
            size={32}
            className="self-end mb-12"
            onClick={() => {
              setSelectedImage(null);
              router.push(
                isConcept ? `/portfolio/concept/${slug}` : `/portfolio/${slug}`
              );
            }}
          />

          <ImageGallery
            items={images.map((image) => ({
              originalTitle: image.fields.title,
              original: makeUrl(image.fields.file.url),
            }))}
            infinite={true}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            startIndex={selectedImage ? images.indexOf(selectedImage) : 0}
            onSlide={(currentIndex) => {
              setSelectedImage(images[currentIndex]);
              router.replace(
                isConcept
                  ? `/portfolio/concept/${slug}?image=${getSlug(
                      images[currentIndex].fields.title
                    )}`
                  : `/portfolio/${slug}?image=${getSlug(
                      images[currentIndex].fields.title
                    )}`
              );
            }}
            additionalClass="mb-4"
          />

          <p className="text-center text-xl font-light mb-6">
            {selectedImage?.fields.title}
          </p>

          <p className="text-center text-gray-500">
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
