"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./_components/SplashScreen";

export default function Home() {
  const [isTimeoutDone, setIsTimeoutDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsTimeoutDone(true);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isTimeoutDone && <SplashScreen fadeOut={fadeOut} />}
      <section className="-mt-16">
        <video
          muted
          loop
          autoPlay
          playsInline
          id="cover-video"
          className="md:hidden"
        >
          <source src="/videos/cover-mobile.mp4" type="video/mp4" />
        </video>
        <video
          muted
          loop
          autoPlay
          playsInline
          id="cover-video"
          className="hidden md:block"
        >
          <source src="/videos/cover-desktop.mp4" type="video/mp4" />
        </video>
      </section>
    </>
  );
}
