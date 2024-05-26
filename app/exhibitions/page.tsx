import Title from "../_components/Title";
import useExhibitions, {
  ExhibitionEntrySkeleton,
} from "@/hooks/useExhibitions";
import Exhibition from "./_components/Exhibition";
import { Entry } from "contentful";

export interface Image {
  fields: {
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export default async function Exhibitions() {
  const upcomingExhibitions = await useExhibitions({
    status: "upcoming",
  });

  const pastExhibitions = await useExhibitions({
    status: "past",
  });

  return (
    <section className="px-4">
      <Title text="exhibitions" className="mb-6" />
      <p className="font-medium text-lg mb-4">upcoming</p>
      <div className="mb-8">
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
      <p className="font-medium text-lg mb-4">past</p>
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
    </section>
  );
}
