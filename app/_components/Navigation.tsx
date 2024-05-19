"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  console.log(isNavigationOpen);
  return (
    <nav>
      {isNavigationOpen ? (
        <div className="fixed w-screen h-screen bg-white fade-in grid grid-rows-3">
          <p
            onClick={() => setIsNavigationOpen(false)}
            className="justify-self-end"
          >
            close
          </p>
          <div
            className="self-center justify-self-center text-center flex flex-col gap-6 uppercase"
            onClick={() => setIsNavigationOpen(false)}
          >
            <Link href="/categories">categories</Link>
            <Link href="/biography">biography</Link>
            <Link href="/exhbitions">exhibitions</Link>
            <Link href="/contact">contact</Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-between px-4 py-2 ">
          <Link href="/">logo</Link>
          <p onClick={() => setIsNavigationOpen(true)}>open</p>
        </div>
      )}
    </nav>
  );
}
