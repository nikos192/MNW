"use client";

import { useEffect, useState } from "react";

type DesktopHeroVideoProps = {
  className: string;
  poster: string;
  src: string;
};

export function DesktopHeroVideo({ className, poster, src }: DesktopHeroVideoProps) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!desktop) return null;

  return (
    <video
      autoPlay
      className={className}
      loop
      muted
      playsInline
      poster={poster}
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
