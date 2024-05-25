interface AwardProps {
  year: number;
  name: string;
}

export default function Award({ year, name }: AwardProps) {
  console.log({ year, name });
  return (
    <div className="flex gap-2">
      <p className="text-crimson font-medium">{year.toString()}</p>
      <p className="font-light">{name}</p>
    </div>
  );
}
