"use client";

import { useEffect, useRef } from "react";

type ResponsiveHeroVideoProps = {
  className: string;
  desktopSrc: string;
  mobileSrc: string;
};

export function ResponsiveHeroVideo({
  className,
  desktopSrc,
  mobileSrc,
}: ResponsiveHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch(() => {
        // The muted, inline video normally autoplays. The first frame remains
        // visible if a browser or device policy still prevents playback.
      });
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source media="(max-width: 767px)" src={mobileSrc} type="video/mp4" />
      <source src={desktopSrc} type="video/mp4" />
    </video>
  );
}
