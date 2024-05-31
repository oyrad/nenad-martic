"use client";

import NavigationItem from "./NavigationItem";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <header className="hidden md:block py-3 backdrop-blur-3xl">
      {pathname === "/" && (
        <div className="h-[66px] w-full bg-black fixed top-0 opacity-30 z-10" />
      )}
      <nav className="flex justify-evenly items-center">
        <NavigationItem url="/portfolio" text="portfolio" />
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
          />
        </Link>
        <NavigationItem url="/exhibitions" text="exhibitions" />
        <NavigationItem url="/contact" text="contact" />
      </nav>
    </header>
  );
}
