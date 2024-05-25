import { client } from "@/contentful";

type AwardFields = {
  name: string;
  year: number;
};

export default async function useAwards() {
  const response = await client.getEntries({ content_type: "award" });

  return response.items.sort((a, b) => a.fields.year - b.fields.year);
}
