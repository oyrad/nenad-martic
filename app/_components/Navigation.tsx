"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavigationItem from "./NavigationItem";
import { useSearchParams } from "next/navigation";

export default function Navigation() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const pathname = usePathname();

  function handleNavigationClose() {
    setIsNavigationOpen(false);
  }

  const imageParam = useSearchParams().get("image");

  if (imageParam) {
    return null;
  }

  return (
    <header className="fixed w-full">
      {isNavigationOpen && (
        <nav className="fixed w-screen h-screen bg-background fade-in px-4 py-3 flex flex-col">
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
            <Image
              src="/images/logo-black.svg"
              alt="logo"
              width={42}
              height={42}
            />
          </Link>

          <div
            className="self-center justify-self-center text-center flex flex-col gap-8"
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
          "flex justify-between items-center px-4 py-3 z-10",
          pathname !== "/" && "bg-background"
        )}
      >
        <Link href="/">
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
        <List
          size={42}
          onClick={() => setIsNavigationOpen(true)}
          color={pathname === "/" ? "white" : "black"}
        />
      </div>
    </header>
  );
}
