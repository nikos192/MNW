"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./favourites-section.module.css";

type FavouriteBuild = {
  car: string;
  wheel: string;
  description: string;
  images: string[];
  imageAlt: string;
  href: string;
};

const builds: FavouriteBuild[] = [
  {
    car: "McLaren 720S",
    wheel: "Bespoke white forged wheels",
    description:
      "A bold, bespoke setup shaped around the 720S. The custom white finish traces its sculpted surfaces and gives the supercar an unmistakably individual stance.",
    images: Array.from({ length: 5 }, (_, index) => `/favourites/720s%20${index + 1}.png`),
    imageAlt: "White McLaren 720S on bespoke white Monza forged wheels",
    href: "/contact?design=custom",
  },
  {
    car: "Mercedes-AMG E63 S",
    wheel: 'Black MW-22 “Lesmo”',
    description:
      "Black MW-22 Lesmo wheels sharpen the E63 S without overpowering it. The result is aggressive and understated, balancing executive restraint with the car’s formidable performance character.",
    images: Array.from({ length: 3 }, (_, index) => `/favourites/e63s%20${index + 1}.png`),
    imageAlt: "Mercedes-AMG E63 S fitted with black MW-22 Lesmo wheels",
    href: "/shop/MW-22",
  },
  {
    car: "BMW F82 M4 Competition",
    wheel: 'Polished MW-21 “Ascari”',
    description:
      "Polished MW-21 Ascari wheels bring a crisp, technical contrast to Yas Marina Blue. The bright multi-piece finish catches the light and gives the F82’s muscular proportions even more presence.",
    images: Array.from({ length: 5 }, (_, index) => `/favourites/M4%20Competition%20${index + 1}.png`),
    imageAlt: "Yas Marina Blue BMW F82 M4 Competition on polished MW-21 Ascari wheels",
    href: "/shop/MW-21",
  },
];

function BuildCarousel({ build, buildIndex }: { build: FavouriteBuild; buildIndex: number }) {
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
    <article className={styles.feature} aria-labelledby={titleId}>
      <div
        className={styles.carousel}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${build.car} image gallery`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
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
                alt={activeIndex === index ? `${build.imageAlt}, view ${index + 1} of ${build.images.length}` : ""}
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
          <button aria-label={`Previous ${build.car} image`} onClick={() => select(activeIndex - 1)} type="button">
            <span aria-hidden="true">←</span>
          </button>
          <p aria-live="polite"><span>{String(activeIndex + 1).padStart(2, "0")}</span> / {String(build.images.length).padStart(2, "0")}</p>
          <button aria-label={`Next ${build.car} image`} onClick={() => select(activeIndex + 1)} type="button">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.copy}>
        <p className={styles.number}>Favourite {String(buildIndex + 1).padStart(2, "0")}</p>
        <h3 id={titleId}>{build.car}</h3>
        <p className={styles.wheel}>{build.wheel}</p>
        <p className={styles.description}>{build.description}</p>
        <Link className={styles.buildLink} href={build.href}>
          Explore this setup <span aria-hidden="true">↗</span>
        </Link>
        <div className={styles.indicators} aria-label={`Choose ${build.car} image`}>
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

export function FavouritesSection() {
  return (
    <section className={styles.section} aria-labelledby="favourites-title">
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>Customer builds · selected by Monza</p>
          <div>
            <h2 id="favourites-title">Our Favourites</h2>
            <p>
              A selection of standout builds featuring Monza wheels. Explore some of our
              favourite combinations and see how the right wheel transforms the character of a car.
            </p>
          </div>
        </header>

        <div className={styles.features}>
          {builds.map((build, index) => <BuildCarousel build={build} buildIndex={index} key={build.car} />)}
        </div>

        <footer className={styles.footer}>
          <div><p>Your car, resolved properly.</p><span>Fitment and design confirmed before production.</span></div>
          <Link className="button-primary" href="/contact">Build Your Setup</Link>
        </footer>
      </div>
    </section>
  );
}
