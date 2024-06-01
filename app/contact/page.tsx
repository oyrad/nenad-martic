"use client";

import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import Title from "../_components/Title";
import Link from "next/link";
import FadeInImage from "../_components/FadeInImage";
import SectionContainer from "../_components/SectionContainer";

export default function Contact() {
  return (
    <SectionContainer className="flex flex-col gap-2 text-center">
      <Title text="Contact" className="mb-8" />
      <div className="flex gap-2 justify-center mb-1">
        <Link href="https://www.instagram.com/nenadmartic_art/" target="_blank">
          <InstagramLogo size={32} />
        </Link>
        <Link href="https://www.instagram.com/nenadmartic_art/" target="_blank">
          <FacebookLogo size={32} />
        </Link>
      </div>
      <Link className="text-xl font-light" href="tel:+38598230547">
        +385 98 230 547
      </Link>
      <Link
        className="text-xl font-light mb-4"
        href="mailto:nenomartic@gmail.com"
      >
        nenomartic@gmail.com
      </Link>
      <FadeInImage src="/images/contact.webp" alt="Contact" />
    </SectionContainer>
  );
}
