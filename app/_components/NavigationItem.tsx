import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  url: string;
  text: string;
  className?: string;
}

export default function NavigationItem({
  url,
  text,
  className = "",
}: NavigationItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={url}
      className={cn(
        "font-light text-2xl md:text-xl uppercase hover:text-crimson hover:border-b hover:border-crimson z-20",
        pathname.includes(url) && "text-crimson border-b border-crimson px-2",
        pathname === "/" && "md:text-white hover:text-gray-300 border-none",
        className
      )}
    >
      {text}
    </Link>
  );
}
