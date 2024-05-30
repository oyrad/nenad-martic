import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Image as ImageType } from "@/types/types";
import { getSlug, makeUrl } from "@/lib/utils";
import GalleryImage from "./GalleryImage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryProps {
  images: ImageType[];
  slug: string;
}

export default function Gallery({ images, slug }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isImageNotFound, setIsImageNotFound] = useState(false);

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
          href={`/portfolio/${slug}`}
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
      {imageParam ? (
        <div className="fixed top-0 left-0 h-full w-full bg-background flex flex-col p-4">
          <Link
            href={`/portfolio/${slug}`}
            className="self-end mb-8"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </Link>

          {selectedImage && (
            <Image
              src={makeUrl(selectedImage!.fields.file.url)}
              alt={selectedImage!.fields.title}
              width={selectedImage!.fields.file.details.image.width}
              height={selectedImage!.fields.file.details.image.height}
              className="self-center mb-4"
            />
          )}
          <Link
            href={`/portfolio/${slug}?image=${getSlug(
              images[images.indexOf(selectedImage!) - 1]?.fields.title ||
                images[images.length - 1].fields.title
            )}`}
          >
            <ArrowLeft
              size={32}
              onClick={() => {
                const index = images.indexOf(selectedImage!);
                setSelectedImage(
                  images[index - 1] || images[images.length - 1]
                );
              }}
            />
          </Link>
          <p>
            {images.indexOf(selectedImage!) + 1} / {images.length}
          </p>
          <Link
            href={`/portfolio/${slug}?image=${getSlug(
              images[images.indexOf(selectedImage!) + 1]?.fields.title ||
                images[0].fields.title
            )}`}
          >
            <ArrowRight
              size={32}
              onClick={() => {
                const index = images.indexOf(selectedImage!);
                setSelectedImage(images[index + 1] || images[0]);
              }}
            />
          </Link>
          <p className="text-center">{selectedImage?.fields.title}</p>
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
          <Masonry gutter="4px">
            {images.map((image, index) => (
              <Link
                key={index}
                href={`/portfolio/${slug}?image=${getSlug(image.fields.title)}`}
                onClick={() => setSelectedImage(image)}
              >
                <GalleryImage
                  src={makeUrl(image.fields.file.url)}
                  alt={image.fields.title}
                  width={image.fields.file.details.image.width}
                  height={image.fields.file.details.image.height}
                />
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}
