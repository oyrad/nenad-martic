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
    <Link className="text-center flex flex-col" href={href}>
      <FadeInImage src={coverImageUrl} alt={coverImageAlt} className="mb-2" />
      <h2 className="font-medium text-lg">{title}</h2>
      {subtitle && <p className="font-light text-sm">{subtitle}</p>}
    </Link>
  );
}
