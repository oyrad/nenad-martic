import type { Metadata } from "next";
import Navigation from "./_components/Navigation";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Suspense } from "react";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nenad Martic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jost.className, "text-blackish pb-8")}>
        <Suspense>
          <Navigation />
          <main className="pt-16">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
