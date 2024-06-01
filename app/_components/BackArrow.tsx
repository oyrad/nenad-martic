"use client";

import { ArrowLeft } from "@phosphor-icons/react";

export default function BackArrow() {
  return (
    <ArrowLeft
      size={window.innerWidth < 768 ? 32 : 36}
      className="hover:opacity-70 transform-opactiy duration-200"
    />
  );
}
