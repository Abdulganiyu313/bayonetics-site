"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./NavBar.module.scss";

type Child = { label: string; href: string };
type Item = { label: string; href?: string; children?: Child[] };

const NAV: Item[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Precision Machining", href: "/services#precision-machining" },
      { label: "Welding & Fabrication", href: "/services#welding-fabrication" },
      { label: "Maintenance & Repair", href: "/services#maintenance-repair" },
      { label: "Custom Parts", href: "/services#custom-parts" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDisclosures, setOpenDisclosures] = useState<
    Record<string, boolean>
  >({});

  function toggleDisclosure(key: string) {
    setOpenDisclosures((s) => ({ ...s, [key]: !s[key] }));
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Bayonetics home">
          <Image
            src="/favicon/favicon-96x96.png" // rounded favicon or your logo
            alt="Bayonetics Engineering"
            width={32}
            height={32}
            className={styles.logo}
          />
          <span>Bayonetics Engineering</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.list}>
            {NAV.map((item) => (
              <li className={styles.item} key={item.label}>
                <Link
                  href={item.href ?? "#"}
                  className={styles.toplink}
                  aria-haspopup={!!item.children}
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <>
                    <span className={styles.caret} aria-hidden>
                      <ChevronDown size={16} />
                    </span>
                    <ul className={styles.dropdown} role="menu">
                      {item.children.map((c) => (
                        <li key={c.label} role="none">
                          <Link href={c.href} role="menuitem">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
          <Link href="/contact" className={styles.cta}>
            Request a Quote
          </Link>
        </nav>
        {/* Mobile toggle */}
        <button
          className={styles.toggle}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      <div className={`${styles.mobilePanel} ${mobileOpen ? styles.open : ""}`}>
        <ul className={styles.mList}>
          {NAV.map((item) => {
            const hasKids = !!item.children?.length;
            const open = !!openDisclosures[item.label];
            return (
              <li key={item.label} className={styles.mItem}>
                <div className={styles.mRow}>
                  <Link
                    href={item.href ?? "#"}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {hasKids && (
                    <button
                      className={styles.mDisclosure}
                      aria-expanded={open}
                      onClick={() => toggleDisclosure(item.label)}
                    >
                      <ChevronDown size={18} />
                    </button>
                  )}
                </div>
                {hasKids && (
                  <ul
                    className={`${styles.mDropdown} ${open ? styles.mOpen : ""}`}
                  >
                    {item.children!.map((c) => (
                      <li key={c.label}>
                        <Link
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <Link
          href="/contact"
          className={styles.mCta}
          onClick={() => setMobileOpen(false)}
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}
