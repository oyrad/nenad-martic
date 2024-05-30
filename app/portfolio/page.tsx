import Title from "../_components/Title";
import { makeUrl } from "@/lib/utils";
import Category from "./_components/Category";
import useCategories from "@/hooks/useCategories";

export default async function Categories() {
  const categories = await useCategories({ isConcept: false });

  return (
    <section className="px-4">
      <Title text="portfolio" className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category: any, index: number) => (
          <Category
            key={index}
            coverImageUrl={makeUrl(category.fields.coverImage.fields.file.url)}
            coverImageAlt={category.fields.coverImage.fields.title}
            title={category.fields.title}
            subtitle={category.fields.subtitle}
            href={`/portfolio/${category.fields.slug}`}
          />
        ))}
        <Category
          coverImageUrl="/images/concept.png"
          coverImageAlt="concept"
          title="Concept"
          href="/portfolio/concept"
        />
      </div>
    </section>
  );
}
