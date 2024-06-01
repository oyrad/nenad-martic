import type { Metadata } from "next";
import MobileNavigation from "./_components/MobileNavigation";
import DesktopNavigation from "./_components/DesktopNavigation";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nenad Martic",
  description:
    "Nenad Martić was born and educated in Zagreb. He graduated from the Faculty of Education in Zagreb, majoring in Fine Arts. At the beginning of his rich career, he worked as an illustrator, and since 1990, he has run his own graphic design studio. Parallel to his professional career as a designer, he has shown great interest in photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jost.className, "text-blackish pb-8")}>
        <NextTopLoader color="#C62F20" showSpinner={false} />
        <Suspense>
          <MobileNavigation />
          <DesktopNavigation />
          <main className="pt-16 md:pt-0">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
