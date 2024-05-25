import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  url: string;
  text: string;
}

export default function NavigationItem({ url, text }: NavigationItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={url}
      className={cn(
        "font-light text-2xl uppercase",
        pathname.includes(url) && "text-crimson border-b border-crimson px-2"
      )}
    >
      {text}
    </Link>
  );
}
