"use client";

import NavigationItem from "./NavigationItem";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "hidden md:block py-3 backdrop-blur-3xl mb-8",
        pathname !== "/" && "border-b border-gray-300"
      )}
    >
      {pathname === "/" && (
        <div className="h-[66px] w-full bg-black fixed top-0 opacity-30 z-10" />
      )}
      <nav className="flex justify-between md:px-20 lg:px-44 xl:px-96 items-center">
        <NavigationItem
          url="/portfolio"
          text="portfolio"
          className={pathname === "/" ? "" : ""}
        />
        <NavigationItem url="/biography" text="biography" />
        <Link href="/" className="z-20">
          <Image
            src={
              pathname === "/"
                ? "/images/logo-white.svg"
                : "/images/logo-black.svg"
            }
            alt="logo"
            width={42}
            height={42}
            className="hover:opacity-70 transform-opactiy duration-200"
          />
        </Link>
        <NavigationItem url="/exhibitions" text="exhibitions" />
        <NavigationItem url="/contact" text="contact" />
      </nav>
    </header>
  );
}
