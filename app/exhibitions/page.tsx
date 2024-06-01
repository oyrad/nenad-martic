import Title from "../_components/Title";
import useExhibitions, {
  ExhibitionEntrySkeleton,
} from "@/hooks/useExhibitions";
import Exhibition from "./_components/Exhibition";
import { Entry } from "contentful";
import { Image } from "@/types/types";
import SectionContainer from "../_components/SectionContainer";

export default async function Exhibitions() {
  const upcomingExhibitions = await useExhibitions({
    status: "upcoming",
  });

  const pastExhibitions = await useExhibitions({
    status: "previous",
  });

  return (
    <SectionContainer>
      <Title text="exhibitions" className="md:mb-12" />
      <p className="font-medium text-lg md:text-2xl mb-4 md:mb-8">upcoming</p>
      <div className="mb-8 md:mb-16">
        {upcomingExhibitions.map(
          (exhibition: Entry<ExhibitionEntrySkeleton>, index) => (
            <Exhibition
              key={index}
              name={exhibition.fields.name as string}
              year={exhibition.fields.year as number}
              description={exhibition.fields.description as string}
              images={exhibition.fields.images as unknown as Image[]}
            />
          )
        )}
      </div>
      <p className="font-medium text-lg md:text-2xl mb-4 md:mb-8">previous</p>
      <div>
        {pastExhibitions.map(
          (exhibition: Entry<ExhibitionEntrySkeleton>, index) => (
            <Exhibition
              key={index}
              name={exhibition.fields.name as string}
              year={exhibition.fields.year as number}
              description={exhibition.fields.description as string}
              images={exhibition.fields.images as unknown as Image[]}
            />
          )
        )}
      </div>
    </SectionContainer>
  );
}
