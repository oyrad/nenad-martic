import { client } from '@/contentful';
import { EntryFieldTypes } from 'contentful';

interface StorytellingCategoryFields {
  categories: EntryFieldTypes.Array<any>;
}

interface StorytellingCategoryEntrySkeleton {
  fields: StorytellingCategoryFields;
  contentTypeId: 'storytellingCategories';
}

export default async function useStorytellingCategories() {
  const { items } = await client.getEntries<StorytellingCategoryEntrySkeleton>({
    content_type: 'storytellingCategories',
  });

  return items[0].fields.categories;
}
