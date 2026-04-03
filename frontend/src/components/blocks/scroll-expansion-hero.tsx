"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = (): void => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.78;
      const end = -viewportHeight * 0.45;
      const nextProgress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

      setScrollProgress(nextProgress);
      frameRef.current = null;
    };

    const requestProgressUpdate = (): void => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    requestProgressUpdate();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 42 + scrollProgress * (isMobileState ? 50 : 52);
  const mediaHeight = 46 + scrollProgress * (isMobileState ? 22 : 32);
  const textTranslateX = scrollProgress * (isMobileState ? 5 : 8);
  const headingOpacity = 1 - scrollProgress * 0.78;
  const showContent = scrollProgress > (isMobileState ? 0.2 : 0.28);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[128svh] overflow-x-hidden bg-[#111110] text-[#f5f5f3] md:min-h-[150svh]"
    >
      <section className="sticky top-0 flex min-h-[100dvh] flex-col items-center justify-start overflow-hidden">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 + (1 - scrollProgress) * 0.5 }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="h-screen w-screen"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter: "grayscale(1) blur(14px)",
                transform: "scale(1.1)",
              }}
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,15,0.58),rgba(15,15,15,0.78))]" />
          </motion.div>

          <div className="container relative z-10 mx-auto flex h-[100dvh] flex-col items-center justify-center">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/12 bg-[#050505] transition-none"
                style={{
                  width: `${mediaWidth}vw`,
                  height: `${mediaHeight}vh`,
                  maxWidth: "95vw",
                  maxHeight: "88vh",
                  boxShadow: "0 32px 90px rgba(0, 0, 0, 0.42)",
                  borderRadius: `${28 - scrollProgress * 18}px`,
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative h-full w-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        title={title || "Scroll expansion media"}
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="h-full w-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div className="absolute inset-0 rounded-xl bg-black/30" initial={{ opacity: 0.7 }} animate={{ opacity: 0.38 - scrollProgress * 0.18 }} transition={{ duration: 0.2 }} />
                    </div>
                  ) : (
                    <div className="relative h-full w-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full rounded-xl object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: "none" }}
                      ></div>

                      <motion.div className="absolute inset-0 rounded-xl bg-black/24" initial={{ opacity: 0.62 }} animate={{ opacity: 0.34 - scrollProgress * 0.14 }} transition={{ duration: 0.2 }} />
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="h-full w-full rounded-xl object-cover"
                    />

                    <motion.div className="absolute inset-0 rounded-xl bg-black/40" initial={{ opacity: 0.64 }} animate={{ opacity: 0.42 - scrollProgress * 0.16 }} transition={{ duration: 0.2 }} />
                  </div>
                )}

                <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-8 text-center transition-none md:pt-10">
                  {date && (
                    <p
                      className="text-[11px] font-light uppercase tracking-[0.42em] text-[#afafad]"
                      style={{ transform: `translateX(-${textTranslateX}vw)`, opacity: headingOpacity }}
                    >
                      {date}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-3 text-center transition-none ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
                style={{ opacity: headingOpacity }}
              >
                <motion.h2
                  className="max-w-[10ch] text-4xl font-bold leading-[0.9] tracking-[-0.06em] text-[#f5f5f3] transition-none md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="max-w-[10ch] text-center text-4xl font-bold leading-[0.9] tracking-[-0.06em] text-[#f5f5f3] transition-none md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
                {scrollToExpand && (
                  <motion.p
                    className="mt-4 text-[11px] font-light uppercase tracking-[0.32em] text-[#afafad]"
                    style={{ transform: `translateY(${scrollProgress * 18}px)` }}
                  >
                    {scrollToExpand}
                  </motion.p>
                )}
              </div>
            </div>

            <motion.section
              className="pointer-events-none absolute inset-x-0 bottom-[5vh] mx-auto flex w-full max-w-6xl flex-col px-6 md:bottom-[8vh] md:px-10 lg:px-16"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 32 }}
              transition={{ duration: 0.45 }}
            >
              <div className="pointer-events-auto rounded-[28px] border border-white/10 bg-[rgba(16,16,16,0.78)] p-6 backdrop-blur-xl md:rounded-[32px] md:p-10">
                {children}
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
