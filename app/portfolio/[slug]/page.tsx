"use client";

import { useEffect, useState } from "react";
import Gallery from "../_components/Gallery";
import { useParams } from "next/navigation";
import { CategoryEntrySkeleton } from "@/hooks/useCategories";
import { createClient } from "contentful";
import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

export default function CategoryDetails() {
  const { slug } = useParams();
  const [categoryDetails, setCategoryDetails] = useState<any>();

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
      <div className="px-4 pt-4">
        <div className="flex gap-3 items-center mb-4">
          <Link href="/portfolio">
            <ArrowLeft size={32} />
          </Link>
          <h1 className="text-crimson font-light uppercase text-2xl">
            {categoryDetails.title}
          </h1>
        </div>
        <Gallery images={categoryDetails.images} />
      </div>
    );
  }
}
