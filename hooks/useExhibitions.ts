import { client } from '@/contentful';
import { EntryFieldTypes } from 'contentful';

interface ExhibitionFields {
  name: EntryFieldTypes.Text;
  year: EntryFieldTypes.Integer;
  description: EntryFieldTypes.Text;
  images: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  status: EntryFieldTypes.Text;
}

export interface ExhibitionEntrySkeleton {
  fields: ExhibitionFields;
  contentTypeId: 'exhibition';
}

interface UseExhibitionsOptions {
  status: 'upcoming' | 'previous';
}

export default async function useExhibitions(options: UseExhibitionsOptions) {
  const response = await client.getEntries<ExhibitionEntrySkeleton>({
    content_type: 'exhibition',
    'fields.status': options.status,
  });

  return response.items.sort((a, b) => b.fields.year - a.fields.year);
}
