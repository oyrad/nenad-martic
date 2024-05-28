import { client } from "@/contentful";
import { EntryFieldTypes } from "contentful";

export type CategoryFields = {
  title: EntryFieldTypes.Text;
  subtitle: EntryFieldTypes.Text;
  coverImage: EntryFieldTypes.Symbol;
  images: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description?: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
};

export type CategoryEntrySkeleton = {
  fields: CategoryFields;
  contentTypeId: "category";
};

export default async function useCategories() {
  const response = await client.getEntries<CategoryEntrySkeleton>({
    content_type: "category",
  });

  return response.items;
}
