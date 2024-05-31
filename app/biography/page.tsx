import Title from "../_components/Title";
import AwardList from "./_components/AwardList";
import Image from "next/image";
import BiographyImage from "@/public/images/biography.webp";

export default function Biography() {
  return (
    <section className="px-4 flex flex-col gap-4">
      <Title text="about nenad" />
      <Image
        src={BiographyImage}
        alt="biography"
        width={1000}
        height={100}
        placeholder="blur"
      />
      <p className="font-light">
        Nenad Martić was born and educated in Zagreb. He graduated from the
        Faculty of Education in Zagreb, majoring in Fine Arts. At the beginning
        of his rich career, he worked as an illustrator, and since 1990, he has
        run his own graphic design studio. Parallel to his professional career
        as a designer, he has shown great interest in photography.
      </p>
      <p className="font-light">
        In 2013, he joined the Zagreb Photographic Society, and shortly after,
        his competitive activity began. He has won numerous awards in both
        domestic and international competitions. Only in competitions under the
        patronage of FIAP (Fédération Internationale de l&apos;Art
        Photographique), he has over{" "}
        <span className="font-normal">
          1300 accepted works and more than 230 awarded ones
        </span>
        .
      </p>
      <p className="font-light">
        He exhibits in numerous exhibitions both nationally and internationally.
        This is his eighth solo exhibition in domestic galleries. He lives and
        works in Zagreb.
      </p>
      <p className="font-light">
        Among significant achievements, following stand out:
      </p>
      <AwardList />
    </section>
  );
}
