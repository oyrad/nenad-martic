import { client } from "@/contentful";
import { EntryFieldTypes } from "contentful";

type AwardFields = {
  name: EntryFieldTypes.Text;
  year: EntryFieldTypes.Integer;
};

export type AwardEntrySkeleton = {
  fields: AwardFields;
  contentTypeId: "award";
};

export default async function useAwards() {
  const response = await client.getEntries<AwardEntrySkeleton>({
    content_type: "award",
  });

  return response.items.sort((a, b) => a.fields.year - b.fields.year);
}
