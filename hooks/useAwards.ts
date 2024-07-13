import { client } from '@/contentful';
import { EntryFieldTypes } from 'contentful';

interface AwardFields {
  name: EntryFieldTypes.Text;
  year: EntryFieldTypes.Integer;
}

export interface AwardEntrySkeleton {
  fields: AwardFields;
  contentTypeId: 'award';
}

export default async function useAwards() {
  const { items } = await client.getEntries<AwardEntrySkeleton>({
    content_type: 'award',
  });

  return items.sort((a, b) => a.fields.year - b.fields.year);
}
