import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  fadeOut: boolean;
}

export default function SplashScreen({ fadeOut }: SplashScreenProps) {
  const [shouldTextBeShown, setShouldTextBeShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldTextBeShown(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 h-screen w-screen bg-black z-50 flex flex-col justify-center items-center",
        fadeOut && "fadeOut"
      )}
    >
      <Image
        src="/images/logo-white.svg"
        alt="logo"
        width={150}
        height={150}
        className="fade-in-logo mb-8"
      />
      {shouldTextBeShown ? (
        <div className="text-center fade-in text-white uppercase">
          <h1 className=" text-3xl mb-2">nenad martic</h1>
          <h2 className="text-2xl">Master of photography</h2>
        </div>
      ) : (
        <div className="text-center text-black uppercase">
          <h1 className="text-3xl mb-2">nenad martic</h1>
          <h2 className="text-2xl">Master of photography</h2>
        </div>
      )}
    </div>
  );
}
