"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./burnout-wheel.module.css";

const MAX_SCROLL_SPEED = 1900;
const SPIN_MULTIPLIER = 5;
const COOL_DOWN_SECONDS = 10 / 3;
const SMOKE_THROTTLE_MS = 92;
const MAX_LIVE_PUFFS = 42;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function BurnoutWheel() {
  const sectionRef = useRef<HTMLElement>(null);
  const smokeLayerRef = useRef<HTMLDivElement>(null);
  const wheelRefs = useRef<Array<HTMLImageElement | null>>([]);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const heatRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const lastSmokeTimeRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();

    function sectionIsHot() {
      const section = sectionRef.current;
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.bottom > -window.innerHeight * 0.35 && rect.top < window.innerHeight * 1.35;
    }

    function pruneSmokeLayer() {
      const layer = smokeLayerRef.current;
      if (!layer) return;

      while (layer.children.length > MAX_LIVE_PUFFS) {
        layer.firstElementChild?.remove();
      }
    }

    function spawnSmokePuff(wheel: HTMLImageElement, velocityPower: number) {
      const layer = smokeLayerRef.current;
      if (!layer || reducedMotion.matches) return;

      const rect = wheel.getBoundingClientRect();
      const puff = document.createElement("span");
      const sourceX = rect.left + rect.width * randomBetween(0.22, 0.36);
      const sourceY = rect.top + rect.height * randomBetween(0.66, 0.78);
      const size = randomBetween(68, 148) + velocityPower * randomBetween(64, 150);
      const duration = randomBetween(900, 1600);

      puff.className = styles.smokePuff;
      puff.style.setProperty("--x", `${sourceX + randomBetween(-10, 16)}px`);
      puff.style.setProperty("--y", `${sourceY + randomBetween(-6, 18)}px`);
      puff.style.setProperty("--dx", `${randomBetween(-window.innerWidth * 0.46, -window.innerWidth * 0.14)}px`);
      puff.style.setProperty("--dy", `${randomBetween(-window.innerHeight * 0.16, window.innerHeight * 0.05)}px`);
      puff.style.setProperty("--size", `${size}px`);
      puff.style.setProperty("--scale", `${randomBetween(1.22, 2.05) + velocityPower * 0.58}`);
      puff.style.setProperty("--duration", `${duration}ms`);
      puff.style.setProperty("--rotate", `${randomBetween(-34, 34)}deg`);
      puff.style.setProperty("--opacity", `${randomBetween(0.28, 0.52)}`);
      puff.addEventListener("animationend", () => puff.remove(), { once: true });
      layer.appendChild(puff);
      window.setTimeout(() => puff.remove(), duration + 120);
      pruneSmokeLayer();
    }

    function spawnScrollSmoke(velocity: number) {
      const now = performance.now();
      const velocityPower = clamp(Math.abs(velocity) / MAX_SCROLL_SPEED, 0, 1);

      if (velocityPower < 0.08 || now - lastSmokeTimeRef.current < SMOKE_THROTTLE_MS) {
        return;
      }

      lastSmokeTimeRef.current = now;
      const burstCount = velocityPower > 0.72 ? 2 : 1;

      wheelRefs.current.forEach((wheel) => {
        if (!wheel) return;
        for (let i = 0; i < burstCount; i += 1) {
          spawnSmokePuff(wheel, velocityPower);
        }
      });
    }

    function handleScroll() {
      const now = performance.now();
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;
      const elapsed = Math.max(now - lastScrollTimeRef.current, 16);
      const velocity = (delta / elapsed) * 1000;

      lastScrollYRef.current = scrollY;
      lastScrollTimeRef.current = now;

      if (!sectionIsHot() || Math.abs(delta) < 0.4) {
        return;
      }

      const velocityPower = clamp(Math.abs(velocity) / MAX_SCROLL_SPEED, 0, 1);
      const distanceHeat = clamp(Math.abs(delta) / 900, 0, 0.16);
      targetSpeedRef.current = clamp(Math.abs(velocity) * 0.98 * SPIN_MULTIPLIER, 0, MAX_SCROLL_SPEED * SPIN_MULTIPLIER);
      heatRef.current = clamp(heatRef.current + distanceHeat * 1.45 + velocityPower * 0.075, 0, 1);
      spawnScrollSmoke(velocity);
    }

    function tick(time: number) {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = time;
      }

      const rawDeltaSeconds = Math.max((time - lastFrameRef.current) / 1000, 0);
      const deltaSeconds = Math.min(rawDeltaSeconds, 0.05);
      lastFrameRef.current = time;

      if (performance.now() - lastScrollTimeRef.current > 80) {
        targetSpeedRef.current *= 0.86;
        if (Math.abs(targetSpeedRef.current) < 1) {
          targetSpeedRef.current = 0;
        }
      }

      const targetSpeed = reducedMotion.matches ? 0 : targetSpeedRef.current;
      speedRef.current += (targetSpeed - speedRef.current) * 0.2;
      angleRef.current = (angleRef.current + speedRef.current * deltaSeconds) % 360;
      heatRef.current = clamp(heatRef.current - rawDeltaSeconds / COOL_DOWN_SECONDS, 0, 1);

      wheelRefs.current.forEach((wheel) => {
        if (wheel) {
          wheel.style.transform = `rotate(${angleRef.current}deg)`;
        }
      });
      stageRefs.current.forEach((stage) => {
        if (stage) {
          stage.style.setProperty("--heat", heatRef.current.toFixed(3));
        }
      });

      frameRef.current = window.requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function renderWheel(index: number) {
    return (
      <div
        className={styles.stage}
        ref={(node) => {
          stageRefs.current[index] = node;
        }}
      >
        <div className={styles.road} aria-hidden="true" />
        <div className={styles.brakeAssembly} aria-hidden="true">
          <span className={styles.brakeRotor} />
          <span className={styles.brakePad} />
        </div>
        <Image
          ref={(node) => {
            wheelRefs.current[index] = node;
          }}
          alt={`MW-21 "Ascari" wheel with performance tyre ${index + 1}`}
          className={styles.wheel}
          draggable={false}
          height={1000}
          priority={index === 0}
          sizes="(max-width: 767px) 28vw, 230px"
          src="/media/new-wheel-better-tire.png"
          width={1000}
        />
      </div>
    );
  }

  return (
    <section className={styles.section} aria-label="Scroll burnout demo" ref={sectionRef}>
      <div className={`${styles.inner} container`}>
        <div className={styles.showcase}>
          {renderWheel(0)}
          <p className={styles.statement}>Built to last</p>
          {renderWheel(1)}
        </div>
      </div>
      <div aria-hidden="true" className={styles.smokeLayer} ref={smokeLayerRef} />
    </section>
  );
}
