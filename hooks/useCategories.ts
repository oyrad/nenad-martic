import { client } from "@/contentful";
import { EntryFieldTypes } from "contentful";

export type CategoryFields = {
  title: EntryFieldTypes.Text;
  subtitle: EntryFieldTypes.Text;
  coverImage: EntryFieldTypes.Symbol;
  images: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description?: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  isConcept: EntryFieldTypes.Boolean;
};

export type CategoryEntrySkeleton = {
  fields: CategoryFields;
  contentTypeId: "category";
};

interface UseCategoriesOptions {
  isConcept?: boolean;
}

export default async function useCategories(options: UseCategoriesOptions) {
  const response = await client.getEntries<CategoryEntrySkeleton>({
    content_type: "category",
    "fields.isConcept": options.isConcept,
  });

  return response.items;
}
