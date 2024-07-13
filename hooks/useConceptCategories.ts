import { client } from '@/contentful';
import { EntryFieldTypes } from 'contentful';

interface DefaultCategoryFields {
  categories: EntryFieldTypes.Array<any>;
}

interface DefaultCategoryEntrySkeleton {
  fields: DefaultCategoryFields;
  contentTypeId: 'conceptCategories';
}

export default async function useConceptCategories() {
  const { items } = await client.getEntries<DefaultCategoryEntrySkeleton>({
    content_type: 'conceptCategories',
  });

  return items[0].fields.categories;
}
