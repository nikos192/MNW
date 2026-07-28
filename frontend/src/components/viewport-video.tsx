"use client";

import { useEffect, useRef, useState } from "react";

type ViewportVideoProps = {
  ariaLabel: string;
  className: string;
  src: string;
};

export function ViewportVideo({ ariaLabel, className, src }: ViewportVideoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {shouldLoad ? (
        <video aria-label={ariaLabel} autoPlay loop muted playsInline preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
