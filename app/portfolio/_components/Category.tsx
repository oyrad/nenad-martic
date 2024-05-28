import Image from "next/image";
import { Image as ImageType } from "../../exhibitions/page";
import { getSlug, makeUrl } from "@/lib/utils";
import Link from "next/link";

interface CategoryProps {
  coverImage: ImageType;
  title: string;
  subtitle: string;
}

export default function Category({
  coverImage,
  title,
  subtitle,
}: CategoryProps) {
  return (
    <Link
      className="text-center flex flex-col gap-1"
      href={`/portfolio/${getSlug(title)}`}
    >
      <Image
        src={makeUrl(coverImage.fields.file.url)}
        alt={coverImage.fields.title}
        width={1000}
        height={100}
        className="mb-2"
      />
      <h2 className="font-medium text-xl">{title}</h2>
      <p className="font-light">{subtitle}</p>
    </Link>
  );
}
