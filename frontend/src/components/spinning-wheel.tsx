"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type SpinningWheelProps = {
  alt: string;
  className: string;
  height: number;
  imageClassName: string;
  priority?: boolean;
  sizes: string;
  src: string;
  width: number;
};

const NORMAL_DEGREES_PER_SECOND = 16;
const FAST_DEGREES_PER_SECOND = 112;

export function SpinningWheel({
  alt,
  className,
  height,
  imageClassName,
  priority = false,
  sizes,
  src,
  width,
}: SpinningWheelProps) {
  const wheelRef = useRef<HTMLImageElement>(null);
  const angleRef = useRef(0);
  const speedRef = useRef(NORMAL_DEGREES_PER_SECOND);
  const lastFrameRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tick = (time: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = time;
      }

      const delta = Math.min((time - lastFrameRef.current) / 1000, 0.05);
      lastFrameRef.current = time;

      if (!reducedMotion.matches) {
        angleRef.current = (angleRef.current + speedRef.current * delta) % 360;
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${angleRef.current}deg)`;
        }
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const speedUp = () => {
    speedRef.current = FAST_DEGREES_PER_SECOND;
  };

  const slowDown = () => {
    speedRef.current = NORMAL_DEGREES_PER_SECOND;
  };

  return (
    <button
      aria-label='Spin the MW-21 "Ascari" wheel faster'
      className={className}
      onBlur={slowDown}
      onFocus={speedUp}
      onPointerCancel={slowDown}
      onPointerDown={speedUp}
      onPointerEnter={speedUp}
      onPointerLeave={slowDown}
      onPointerUp={slowDown}
      type="button"
    >
      <Image
        ref={wheelRef}
        alt={alt}
        className={imageClassName}
        draggable={false}
        height={height}
        priority={priority}
        sizes={sizes}
        src={src}
        width={width}
      />
    </button>
  );
}
