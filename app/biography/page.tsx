import Title from "../_components/Title";

import AwardList from "./_components/AwardList";

export default function Biography() {
  return (
    <section className="px-4 flex flex-col gap-4">
      <Title text="Biography" />
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
      <p className="font-medium">
        Among the significant achievements, the following stand out:
      </p>
      <AwardList />
      <p className="font-light">
        He exhibits in numerous exhibitions both nationally and internationally.
        This is his eighth solo exhibition in domestic galleries
      </p>
      <p className="font-light">He lives and works in Zagreb.</p>
    </section>
  );
}
