import { makeUrl } from "@/lib/utils";
import { Image as ImageType } from "@/types/types";
import FadeInImage from "@/app/_components/FadeInImage";

interface ExhibitionProps {
  name: string;
  year: number;
  description: string;
  images: ImageType[];
}

export default function Exhibition({
  name,
  year,
  description,
  images,
}: ExhibitionProps) {
  return (
    <div>
      <div className="text-xl flex gap-2 mb-2">
        <p className="text-crimson font-medium">{year}</p>
        <p>{name}</p>
      </div>
      <p className="text-lg font-extralight leading-6 mb-2">{description}</p>
      <div className="grid grid-cols-3 gap-1">
        {images.map((image, index) => (
          <FadeInImage
            key={index}
            src={makeUrl(image.fields.file.url)}
            alt={name}
          />
        ))}
      </div>
    </div>
  );
}
