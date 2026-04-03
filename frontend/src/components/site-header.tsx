"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MnwDiamondMark } from "@/components/mnw-diamond-mark";
import styles from "./site-header.module.css";

const leftLinks = [
  { href: "/shop", label: "Wheels" },
  { href: "/gallery", label: "Gallery" },
  { href: "/engineering", label: "Engineering" },
];

const rightLinks = [
  { href: "/finishes", label: "Finishes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  ...leftLinks,
  ...rightLinks,
  { href: "/find-a-dealer", label: "Find a Dealer" },
  { href: "/contact", label: "Request a Quote" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isHome = pathname === "/";
  const isOpen = openPathname === pathname;

  function closeMenu() {
    setOpenPathname(null);
  }

  function toggleMenu() {
    setOpenPathname((current) => (current === pathname ? null : pathname));
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
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
        closeMenu();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isHome && !isScrolled ? styles.transparent : styles.solid}`}
      >
        <div className={styles.utilityBar}>
          <div className={`${styles.utilityInner} container`}>
            <p className={styles.utilityText}>Brisbane, Australia · hello@mnwheels.com.au</p>

            <div className={styles.utilityNav}>
              <a
                aria-label="MNW Instagram"
                className={styles.utilityIconLink}
                href="https://instagram.com/mnwwheels"
                rel="noreferrer noopener"
                target="_blank"
              >
                <span className={styles.utilityMonogram}>IG</span>
              </a>
              <Link className={styles.utilityLink} href="/find-a-dealer">
                Find a Dealer
              </Link>
              <Link className={styles.utilityLink} href="/contact">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.primaryBar} container`}>
          <div className={styles.navSlot}>
            <nav className={`${styles.primaryNav} ${styles.primaryNavLeft}`} aria-label="Primary navigation left">
              <ul className={styles.navList}>
                {leftLinks.map((link) => {
                  const isActive = isActivePath(pathname, link.href);

                  return (
                    <li key={link.href}>
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
          </div>

          <Link aria-label="MNW homepage" className={styles.logoLink} href="/">
            <MnwDiamondMark className={styles.logoMark} title="MNW" />
          </Link>

          <div className={`${styles.navSlot} ${styles.navSlotRight}`}>
            <nav className={`${styles.primaryNav} ${styles.primaryNavRight}`} aria-label="Primary navigation right">
              <ul className={styles.navList}>
                {rightLinks.map((link) => {
                  const isActive = isActivePath(pathname, link.href);

                  return (
                    <li key={link.href}>
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
              aria-controls="site-menu"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              className={styles.mobileToggle}
              onClick={toggleMenu}
              type="button"
            >
              <Menu className={styles.menuIcon} size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        id="site-menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <div className={`${styles.overlayInner} container`}>
          <div className={styles.overlayHeader}>
            <Link aria-label="MNW homepage" className={styles.overlayLogo} href="/" onClick={closeMenu}>
              <MnwDiamondMark className={styles.overlayLogoMark} title="MNW" />
            </Link>

            <button
              aria-label="Close navigation"
              className={styles.overlayClose}
              onClick={closeMenu}
              type="button"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <nav className={styles.overlayNav} aria-label="Mobile navigation">
            {mobileLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  className={`${styles.overlayLink} ${isActive ? styles.overlayLinkActive : ""}`}
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.overlayUtility}>
            <a
              className={styles.overlaySmallLink}
              href="https://instagram.com/mnwwheels"
              rel="noreferrer noopener"
              target="_blank"
            >
              Instagram
            </a>
            <Link className={styles.overlaySmallLink} href="/find-a-dealer" onClick={closeMenu}>
              Find a Dealer
            </Link>
            <Link className={styles.overlaySmallLink} href="/contact" onClick={closeMenu}>
              Request a Quote
            </Link>
          </div>

          <div className={styles.overlayMeta}>
            <p>Brisbane, Australia</p>
            <a href="mailto:hello@mnwheels.com.au">hello@mnwheels.com.au</a>
          </div>
        </div>
      </div>
    </>
  );
}
