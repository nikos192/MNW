"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./site-header.module.css";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/fitment", label: "Fitment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = isOpen ? "true" : "false";

    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`${styles.inner} container`}>
          <Link className={styles.wordmark} href="/">
            MNW
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.href} className={styles.navItem}>
                    <Link
                      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            className={styles.toggle}
            type="button"
            aria-label="Open navigation"
            aria-controls="site-menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span>—</span>
            <span>—</span>
            <span>—</span>
          </button>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        id="site-menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <button
          className={styles.close}
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>

        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={styles.overlayLink}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.overlayMeta}>Forged wheels · Australia</p>
      </div>
    </>
  );
}
