import { cn } from "@/lib/utils";
export default function SectionContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-4 md:px-20 lg:px-44 xl:px-72", className)}>
      {children}
    </section>
  );
}
