import { cn } from "@/lib/utils";
import Image from "next/image";

interface SplashScreenProps {
  fadeOut: boolean;
}

export default function SplashScreen({ fadeOut }: SplashScreenProps) {
  return (
    <div
      className={cn(
        "fixed top-0 h-screen w-screen bg-black z-50 flex flex-col justify-center items-center gap-8",
        fadeOut && "fadeOut"
      )}
    >
      <Image src="/images/logo-white.svg" alt="logo" width={150} height={150} />
      <h1 className="text-white text-2xl uppercase">Master of photography</h1>
    </div>
  );
}
