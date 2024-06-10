import { client } from "@/contentful";
import { EntryFieldTypes } from "contentful";

export type CategoryFields = {
  title: EntryFieldTypes.Text;
  subtitle: EntryFieldTypes.Text;
  coverImage: EntryFieldTypes.Symbol;
  images: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  description?: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  type: EntryFieldTypes.Text;
};

export type CategoryEntrySkeleton = {
  fields: CategoryFields;
  contentTypeId: "category";
};

export type CategoryType = "default" | "concept" | "storytelling";

interface UseCategoriesOptions {
  type: CategoryType;
}

export default async function useCategories(options: UseCategoriesOptions) {
  const response = await client.getEntries<CategoryEntrySkeleton>({
    content_type: "category",
    "fields.type": options.type,
  });

  return response.items;
}
