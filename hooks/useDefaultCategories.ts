import { client } from '@/contentful';
import { EntryFieldTypes } from 'contentful';

interface ConceptCategoryFields {
  categories: EntryFieldTypes.Array<any>;
}

interface ConceptCategoryEntrySkeleton {
  fields: ConceptCategoryFields;
  contentTypeId: 'defaultCategories';
}

export default async function useDefaultCategories() {
  const { items } = await client.getEntries<ConceptCategoryEntrySkeleton>({
    content_type: 'defaultCategories',
  });

  return items[0].fields.categories;
}
