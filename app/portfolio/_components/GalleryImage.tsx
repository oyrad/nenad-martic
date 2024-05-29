import Image from "next/image";

interface GalleryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function GalleryImage({
  src,
  alt,
  width,
  height,
}: GalleryImageProps) {
  return <Image src={src} alt={alt} width={width} height={height} />;
}
