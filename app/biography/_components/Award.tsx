interface AwardProps {
  year: string;
  name: string;
}

export default function Award({ year, name }: AwardProps) {
  return (
    <div className="flex gap-2">
      <p className="text-crimson font-medium">{year}</p>
      <p className="font-light">{name}</p>
    </div>
  );
}
