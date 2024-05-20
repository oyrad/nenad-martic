"use client";

import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <section className="flex flex-col gap-2 text-center pt-6">
      <div className="flex justify-center gap-2">
        <InstagramLogo size={32} />
        <FacebookLogo size={32} />
      </div>
      <p>+385 98 230 547</p>
      <p>nenomartic@gmail.com</p>
    </section>
  );
}
