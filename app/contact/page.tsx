"use client";

import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import Title from "../_components/Title";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="flex flex-col gap-2 px-4 text-center">
      <Title text="Contact" className="mb-8" />
      <div className="flex gap-2 justify-center mb-1">
        <Link href="https://www.instagram.com/nenadmartic_art/">
          <InstagramLogo size={32} />
        </Link>
        <Link href="https://www.instagram.com/nenadmartic_art/">
          <FacebookLogo size={32} />
        </Link>
      </div>
      <Link className="text-xl font-light" href="tel:+38598230547">
        +385 98 230 547
      </Link>
      <Link className="text-xl font-light" href="mailto:nenomartic@gmail.com">
        nenomartic@gmail.com
      </Link>
    </section>
  );
}
