import { client } from "@/contentful";
import { EntryFieldTypes } from "contentful";

type ExhibitionFields = {
  name: EntryFieldTypes.Text;
  year: EntryFieldTypes.Integer;
  description: EntryFieldTypes.Text;
  images: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  status: EntryFieldTypes.Text;
};

export type ExhibitionEntrySkeleton = {
  fields: ExhibitionFields;
  contentTypeId: "exhibition";
};

export type Status = "upcoming" | "past";

interface UseExhibitionsOptions {
  status: "upcoming" | "past";
}

export default async function useExhibitions(options: UseExhibitionsOptions) {
  const response = await client.getEntries<ExhibitionEntrySkeleton>({
    content_type: "exhibition",
    "fields.status": options.status,
  });

  return response.items;
}
