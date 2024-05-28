import Title from "../_components/Title";
import { Image } from "@/types/types";

import Category from "./_components/Category";
import useCategories from "@/hooks/useCategories";

export default async function Categories() {
  const categories = await useCategories();

  return (
    <section className="px-4">
      <Title text="portfolio" className="mb-4" />
      {categories.map((category, index: number) => (
        <Category
          key={index}
          coverImage={category.fields.coverImage as unknown as Image}
          title={category.fields.title}
          subtitle={category.fields.subtitle}
        />
      ))}
    </section>
  );
}
