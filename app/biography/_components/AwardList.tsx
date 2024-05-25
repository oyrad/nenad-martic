import { Entry, EntryCollection } from "contentful";
import Award from "./Award";
import useAwards, { AwardEntrySkeleton } from "@/hooks/useAwards";

export default async function AwardList() {
  const awards = await useAwards();

  console.log(awards);

  if (awards) {
    return (
      <div className="flex flex-col gap-2">
        {awards.map((award: Entry<AwardEntrySkeleton>, index: number) => (
          <Award
            key={index}
            year={award.fields.year as number}
            name={award.fields.name as string}
          />
        ))}
      </div>
    );
  }
}
