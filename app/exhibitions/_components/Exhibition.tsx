import Image from "next/image";
import { makeUrl } from "@/lib/utils";

interface ExhibitionProps {
  name: string;
  year: number;
  description: string;
  images: string[];
  status: "upcoming" | "past";
}

export default function Exhibition({
  name,
  year,
  description,
  images,
  status,
}: ExhibitionProps) {
  console.log(images[0].fields.file.details.image.width);

  return (
    <div>
      <div className="text-xl flex gap-2 mb-2">
        <p className="text-crimson font-medium">{year}</p>
        <p>{name}</p>
      </div>
      <p className="text-lg font-extralight leading-6 mb-2">{description}</p>
      <div className="grid grid-cols-3 gap-1">
        {images.map((image, index) => (
          <Image
            key={index}
            src={makeUrl(image.fields.file.url)}
            alt={name}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}
          />
        ))}
      </div>
    </div>
  );
}
