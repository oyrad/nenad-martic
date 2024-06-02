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
        "font-light text-2xl md:text-xl uppercase hover:text-crimson hover:border-b hover:border-crimson z-20 transition-all duration-100 hover:-pt-1",
        pathname.includes(url) &&
          "text-crimson border-b border-crimson px-2 md:px-0",
        pathname === "/" &&
          "md:text-white hover:text-gray-300 hover:border-gray-300",
        className
      )}
    >
      {text}
    </Link>
  );
}
