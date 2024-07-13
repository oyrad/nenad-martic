import Link from 'next/link';
import { getUrlWithSlug } from '@/lib/utils';
import BackArrow from '@/app/_components/BackArrow';
import { CategoryType } from '@/types/types';

interface NotFoundProps {
  text: string;
  slug: string;
  type: CategoryType;
  setIsImageNotFound: (value: boolean) => void;
}

export default function NotFound({
  text,
  slug,
  type,
  setIsImageNotFound,
}: NotFoundProps) {
  return (
    <>
      <p className="md:text-xl mb-2 font-light uppercase">{text}</p>

      <Link
        href={getUrlWithSlug(type, slug)}
        onClick={() => setIsImageNotFound(false)}
        className="flex gap-2 items-center"
      >
        <BackArrow />

        <p>Return to {slug.replace('-', ' ')}</p>
      </Link>
    </>
  );
}
