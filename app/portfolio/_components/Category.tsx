import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
  coverImageUrl: string;
  coverImageAlt: string;
  title: string;
  href: string;
  subtitle?: string;
}

export default function Category({
  coverImageUrl,
  coverImageAlt,
  title,
  subtitle,
  href,
}: CategoryProps) {
  return (
    <Link className="text-center flex flex-col gap-1" href={href}>
      <Image
        src={coverImageUrl}
        alt={coverImageAlt}
        width={1000}
        height={100}
        className="mb-2"
      />
      <h2 className="font-medium text-xl">{title}</h2>
      {subtitle && <p className="font-light">{subtitle}</p>}
    </Link>
  );
}
