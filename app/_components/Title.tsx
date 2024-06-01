import { cn } from "@/lib/utils";

interface TitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className = "" }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-crimson font-light text-2xl md:text-4xl uppercase pt-4 mb-4 md:mb-8 text-center",
        className
      )}
    >
      {text}
    </h1>
  );
}
