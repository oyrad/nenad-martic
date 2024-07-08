'use client';

import { useEffect, useState } from 'react';
import Gallery from '../_components/Gallery';
import { useParams, useSearchParams } from 'next/navigation';
import { CategoryEntrySkeleton, CategoryType } from '@/hooks/useCategories';
import { createClient } from 'contentful';
import Link from 'next/link';
import SectionContainer from '@/app/_components/SectionContainer';
import BackArrow from '@/app/_components/BackArrow';
import { getReturnUrlFromCategoryType } from '@/lib/utils';

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

interface CategoryDetailsProps {
  backButtonHref: string;
  type: CategoryType;
}

export default function CategoryDetails({
  backButtonHref,
  type,
}: CategoryDetailsProps) {
  const { slug } = useParams();
  const [categoryDetails, setCategoryDetails] = useState<any>();
  const [isCategoryNotFound, setIsCategoryNotFound] = useState(false);

  const imageParam = useSearchParams().get('image');

  useEffect(() => {
    async function getCategoryDetails() {
      if (!slug) {
        return;
      }

      const response = await client.getEntries<CategoryEntrySkeleton>({
        content_type: 'category',
        'fields.slug': slug as string,
      });

      if (!response.items.length) {
        setIsCategoryNotFound(true);
        return;
      }

      setCategoryDetails(response.items[0].fields);
    }

    void getCategoryDetails();
  }, [slug]);

  if (isCategoryNotFound) {
    return (
      <SectionContainer>
        <p className="md:text-xl mb-2 font-light uppercase">
          Category not found
        </p>

        <Link
          href={getReturnUrlFromCategoryType(type)}
          className="flex gap-2 items-center"
        >
          <BackArrow />

          <p>Return to portfolio</p>
        </Link>
      </SectionContainer>
    );
  }

  if (categoryDetails) {
    return (
      <SectionContainer className="pt-4">
        {!imageParam && (
          <div className="md:mb-8">
            <div className="grid grid-cols-8 items-center mb-6">
              <Link href={backButtonHref}>
                <BackArrow />
              </Link>
              <h1 className="text-crimson font-light uppercase text-2xl md:text-4xl col-span-6 place-self-center">
                {categoryDetails.title}
              </h1>
            </div>
            <h3 className="mb-6 font-light">{categoryDetails.description}</h3>
          </div>
        )}
        <Gallery
          images={categoryDetails.images}
          slug={slug as string}
          type={type}
        />
      </SectionContainer>
    );
  }
}
