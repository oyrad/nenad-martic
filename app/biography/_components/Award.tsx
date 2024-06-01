interface AwardProps {
  year: number;
  name: string;
}

export default function Award({ year, name }: AwardProps) {
  return (
    <div className="flex gap-3 text-lg">
      <p className="text-crimson font-medium">{year.toString()}</p>
      <p className="">{name}</p>
    </div>
  );
}
