import { client } from "@/contentful";
import { EntryFieldTypes } from "contentful";

type CategoryFields = {
  title: EntryFieldTypes.Text;
  subtitle: EntryFieldTypes.Text;
  coverImage: EntryFieldTypes.Symbol;
  images: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description?: EntryFieldTypes.Text;
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
