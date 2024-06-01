import useCategories from "@/hooks/useCategories";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Category from "../_components/Category";
import { makeUrl } from "@/lib/utils";

export default async function Concept() {
  const categories = await useCategories({ isConcept: true });

  return (
    <section className="px-4 pt-4">
      <div className="grid grid-cols-3 mb-6">
        <Link href="/portfolio">
          <ArrowLeft size={32} />
        </Link>
        <h1 className="text-crimson font-light uppercase text-2xl place-self-center">
          concept
        </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category: any, index: number) => (
          <Category
            key={index}
            coverImageUrl={makeUrl(category.fields.coverImage.fields.file.url)}
            coverImageAlt={category.fields.coverImage.fields.title}
            title={category.fields.title}
            subtitle={category.fields.subtitle}
            href={`/portfolio/concept/${category.fields.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
