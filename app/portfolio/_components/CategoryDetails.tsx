"use client";

import { useEffect, useState } from "react";
import Gallery from "../_components/Gallery";
import { useParams } from "next/navigation";
import { CategoryEntrySkeleton } from "@/hooks/useCategories";
import { createClient } from "contentful";
import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SectionContainer from "@/app/_components/SectionContainer";
import BackArrow from "@/app/_components/BackArrow";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

interface CategoryDetailsProps {
  backButtonHref: string;
  isConcept: boolean;
}

export default function CategoryDetails({
  backButtonHref,
  isConcept,
}: CategoryDetailsProps) {
  const { slug } = useParams();
  const [categoryDetails, setCategoryDetails] = useState<any>();

  const imageParam = useSearchParams().get("image");

  useEffect(() => {
    async function getCategoryDetails() {
      if (!slug) {
        return;
      }

      const response = await client.getEntries<CategoryEntrySkeleton>({
        content_type: "category",
        "fields.slug": slug as string,
      });

      setCategoryDetails(response.items[0].fields);
    }

    getCategoryDetails();
  }, [slug]);

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
          isConcept={isConcept}
        />
      </SectionContainer>
    );
  }
}
