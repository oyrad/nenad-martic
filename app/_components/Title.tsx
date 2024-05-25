import { cn } from "@/lib/utils";

interface TitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className = "" }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-crimson font-light text-2xl uppercase pt-4",
        className
      )}
    >
      {text}
    </h1>
  );
}
