"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!revealItems.length) {
      return;
    }

    if (prefersReducedMotion || isMobile || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => {
        item.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.dataset.visible = "true";
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -48px 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const heroSection = document.querySelector<HTMLElement>("[data-hero-section]");
    const heroCopy = document.querySelector<HTMLElement>("[data-hero-copy]");

    if (!heroSection || !heroCopy || prefersReducedMotion || isMobile) {
      return;
    }

    let ticking = false;

    const updateHero = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight || window.innerHeight;
      const fadeThreshold = heroHeight * 0.3;
      const progress = Math.min(scrollY / fadeThreshold, 1);

      heroCopy.style.transform = `translate3d(0, ${(-scrollY * 0.6).toFixed(2)}px, 0)`;
      heroCopy.style.opacity = String(1 - progress);
      ticking = false;
    };

    const requestTick = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateHero);
    };

    requestTick();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return null;
}