import Link from "next/link";
import FadeInImage from "@/app/_components/FadeInImage";

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
    <Link
      href={href}
      className="text-center flex flex-col hover:opacity-75 transition-all duration-200"
    >
      <FadeInImage
        src={coverImageUrl}
        alt={coverImageAlt}
        className="mb-2 md:mb-4"
      />
      <h2 className="font-medium text-lg md:text-xl">{title}</h2>
      {subtitle && (
        <p className="font-light text-sm md:text-base">{subtitle}</p>
      )}
    </Link>
  );
}
