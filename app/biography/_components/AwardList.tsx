import { Entry, EntryCollection } from "contentful";
import Award from "./Award";
import useAwards from "@/hooks/useAwards";

export default async function AwardList() {
  const awards = await useAwards();

  if (awards) {
    return (
      <div className="flex flex-col gap-2">
        {awards.map((award: Entry<any>) => (
          <Award key="0" {...award.fields} />
        ))}
      </div>
    );
  }
}
