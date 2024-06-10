import useCategories from '@/hooks/useCategories'
import Link from 'next/link'
import Category from '../_components/Category'
import { makeUrl } from '@/lib/utils'
import SectionContainer from '@/app/_components/SectionContainer'
import BackArrow from '@/app/_components/BackArrow'

export default async function Storytelling() {
  const categories = await useCategories({ type: 'storytelling' })

  return (
    <SectionContainer className="pt-4">
      <div className="grid grid-cols-3 mb-8 md:mb-8">
        <Link href="/portfolio">
          <BackArrow />
        </Link>
        <h1 className="text-crimson font-light uppercase text-2xl md:text-4xl place-self-center">
          storytelling
        </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {categories.map((category: any, index: number) => (
          <Category
            key={index}
            coverImageUrl={makeUrl(category.fields.coverImage.fields.file.url)}
            coverImageAlt={category.fields.coverImage.fields.title}
            title={category.fields.title}
            subtitle={category.fields.subtitle}
            href={`/portfolio/storytelling/${category.fields.slug}`}
          />
        ))}
      </div>
    </SectionContainer>
  )
}
