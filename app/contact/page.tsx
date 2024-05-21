"use client";

import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import Title from "../_components/Title";

export default function Contact() {
  return (
    <section className="flex flex-col gap-2 px-4">
      <Title text="Contact" />
      <div className="flex gap-2">
        <InstagramLogo size={32} />
        <FacebookLogo size={32} />
      </div>
      <p>+385 98 230 547</p>
      <p>nenomartic@gmail.com</p>
    </section>
  );
}
