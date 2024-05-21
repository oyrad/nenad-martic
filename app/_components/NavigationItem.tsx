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
        "font-light text-xl uppercase",
        pathname.includes(url) && "text-crimson"
      )}
    >
      {text}
    </Link>
  );
}
