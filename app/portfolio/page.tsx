import Title from '../_components/Title';
import { makeUrl } from '@/lib/utils';
import Category from './_components/Category';
import useCategories from '@/hooks/useCategories';
import SectionContainer from '../_components/SectionContainer';

export default async function Categories() {
  const categories = await useCategories({ type: 'default' });

  return (
    <SectionContainer>
      <Title text="portfolio" className="mb-8" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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
          coverImageUrl="/images/concept.webp"
          coverImageAlt="concept"
          title="Concept"
          href="/portfolio/concept"
        />
        <Category
          coverImageUrl="/images/storytelling.webp"
          coverImageAlt="storytelling"
          title="Storytelling"
          href="/portfolio/storytelling"
        />
      </div>
    </SectionContainer>
  );
}
