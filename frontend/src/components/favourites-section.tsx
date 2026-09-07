"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./favourites-section.module.css";

import {
  favouriteBuilds as builds,
  type FavouriteBuild,
} from "@/lib/approved-builds";

function BuildCarousel({
  build,
  buildIndex,
}: {
  build: FavouriteBuild;
  buildIndex: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const titleId = `favourite-build-${buildIndex}`;

  function select(index: number) {
    setActiveIndex((index + build.images.length) % build.images.length);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      select(activeIndex + 1);
    }
  }

  return (
    <article
      className={styles.feature}
      aria-labelledby={titleId}
      id={
        build.car === "McLaren 720S"
          ? "mclaren-720s"
          : build.car === "Mercedes-AMG E63 S"
            ? "mercedes-amg-e63-s"
            : "bmw-f82-m4-competition"
      }
    >
      <div
        className={styles.carousel}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${build.car} image gallery`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const distance =
            (event.changedTouches[0]?.clientX ?? touchStartX.current) -
            touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(distance) < 48) return;
          select(activeIndex + (distance < 0 ? 1 : -1));
        }}
      >
        <div className={styles.slides} aria-live="polite">
          {build.images.map((src, index) => (
            <div
              aria-hidden={activeIndex !== index}
              className={styles.slide}
              data-active={activeIndex === index}
              key={src}
            >
              <Image
                alt={
                  activeIndex === index
                    ? `${build.imageAlt}, view ${index + 1} of ${build.images.length}`
                    : ""
                }
                className={styles.image}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1100px) 58vw, 52vw"
                src={src}
              />
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            aria-label={`Previous ${build.car} image`}
            onClick={() => select(activeIndex - 1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <p aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span> /{" "}
            {String(build.images.length).padStart(2, "0")}
          </p>
          <button
            aria-label={`Next ${build.car} image`}
            onClick={() => select(activeIndex + 1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.copy}>
        <p className={styles.number}>
          Favourite {String(buildIndex + 1).padStart(2, "0")}
        </p>
        <h3 id={titleId}>{build.car}</h3>
        <p className={styles.wheel}>{build.wheel}</p>
        <p className={styles.description}>{build.description}</p>
        <Link className={styles.buildLink} href={build.href}>
          Explore this setup <span aria-hidden="true">↗</span>
        </Link>
        <div
          className={styles.indicators}
          aria-label={`Choose ${build.car} image`}
        >
          {build.images.map((_, index) => (
            <button
              aria-label={`Show ${build.car} image ${index + 1} of ${build.images.length}`}
              aria-pressed={activeIndex === index}
              data-active={activeIndex === index}
              key={index}
              onClick={() => select(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function FavouritesSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <section className={styles.section} aria-labelledby="favourites-title">
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Customer builds · selected by Monza</p>
          <div>
            <Heading id="favourites-title">Our Favourites</Heading>
            <p>
              A selection of standout builds featuring Monza wheels. Explore
              some of our favourite combinations and see how the right wheel
              transforms the character of a car.
            </p>
          </div>
        </header>

        <div className={styles.features}>
          {builds.map((build, index) => (
            <BuildCarousel build={build} buildIndex={index} key={build.car} />
          ))}
        </div>

        <footer className={styles.footer}>
          <div>
            <p>Your car, resolved properly.</p>
            <span>Fitment and design confirmed before production.</span>
          </div>
          <Link className="button-primary" href="/contact?enquiry=quote">
            Build Your Setup
          </Link>
        </footer>
      </div>
    </section>
  );
}
