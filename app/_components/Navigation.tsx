"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavigationItem from "./NavigationItem";

export default function Navigation() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const pathname = usePathname();

  function handleNavigationClose() {
    setTimeout(() => setIsNavigationOpen(false), 100);
  }

  return (
    <header className="fixed w-full">
      {isNavigationOpen && (
        <nav className="fixed w-screen h-screen bg-white fade-in px-4 py-2 flex flex-col">
          <X
            onClick={handleNavigationClose}
            size={40}
            className="self-end mb-8 mt-1"
          />
          <Link
            href="/"
            className="self-center mb-8"
            onClick={handleNavigationClose}
          >
            <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
          </Link>

          <div
            className="self-center justify-self-center text-center flex flex-col gap-6"
            onClick={handleNavigationClose}
          >
            <NavigationItem url="/portfolio" text="portfolio" />
            <NavigationItem url="/biography" text="biography" />
            <NavigationItem url="/exhibitions" text="exhibitions" />
            <NavigationItem url="/contact" text="contact" />
          </div>
        </nav>
      )}
      <div
        className={cn(
          "flex justify-between items-center px-4 py-2 z-10",
          pathname !== "/" && "bg-white"
        )}
      >
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </Link>
        <List
          size={46}
          onClick={() => setIsNavigationOpen(true)}
          color={pathname === "/" ? "white" : "black"}
        />
      </div>
    </header>
  );
}
