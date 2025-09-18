"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./NavBar.module.scss";
import type { ServiceLink } from "./NavBar";

type Props = { services: ServiceLink[] };

export default function NavBarClient({ services }: Props) {
  const [open, setOpen] = useState(false); // mobile panel
  const [svcOpen, setSvcOpen] = useState(false); // mobile disclosure

  // Use your rounded favicon as the logo (swap to your real logo path anytime)
  const logoSrc = "/images/brand/bayonetics-logo.png";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand: logo + full name */}
        <Link
          href="/"
          className={styles.brand}
          aria-label="Bayonetics Engineering — Home"
        >
          <Image
            src={logoSrc}
            alt="Bayonetics Engineering logo"
            width={40}
            height={40}
            className={styles.logo}
            priority
          />
          <span>Bayonetics Engineering</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link href="/" className={styles.toplink}>
                Home
              </Link>
            </li>

            {/* Services — desktop: open via CSS hover; click still navigates */}
            <li className={styles.item}>
              <Link href="/services" className={styles.toplink}>
                Services{" "}
                <span className={styles.caret}>
                  <ChevronDown size={16} aria-hidden />
                </span>
              </Link>
              <div
                className={styles.dropdown}
                role="menu"
                aria-label="Services"
              >
                <ul>
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services#${s.slug}`}
                        className={styles.toplink}
                        role="menuitem"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className={styles.item}>
              <Link href="/projects" className={styles.toplink}>
                Projects
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/about" className={styles.toplink}>
                About
              </Link>
            </li>
          </ul>

          <Link href="/contact" className={styles.cta}>
            Request a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-panel"
        className={`${styles.mobilePanel} ${open ? styles.open : ""}`}
      >
        <ul className={styles.mList}>
          <li className={styles.mItem}>
            <div className={styles.mRow}>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </div>
          </li>

          {/* Services disclosure */}
          <li className={styles.mItem}>
            <div className={styles.mRow}>
              <Link href="/services" onClick={() => setOpen(false)}>
                Services
              </Link>
              <button
                type="button"
                className={styles.mDisclosure}
                aria-expanded={svcOpen}
                onClick={() => setSvcOpen((v) => !v)}
              >
                <ChevronDown size={16} aria-hidden />
              </button>
            </div>
            <div
              className={`${styles.mDropdown} ${svcOpen ? styles.mOpen : ""}`}
            >
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services#${s.slug}`}
                  onClick={() => setOpen(false)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </li>

          <li className={styles.mItem}>
            <div className={styles.mRow}>
              <Link href="/projects" onClick={() => setOpen(false)}>
                Projects
              </Link>
            </div>
          </li>
          <li className={styles.mItem}>
            <div className={styles.mRow}>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </div>
          </li>
        </ul>

        <Link
          href="/contact"
          className={styles.mCta}
          onClick={() => setOpen(false)}
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}
