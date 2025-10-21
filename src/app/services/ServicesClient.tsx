"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Services.module.scss";
import type { Service } from "@/lib/content";

/**
 * Client-only grid with filtering chips.
 * This version is defensive: no assumptions about tags, hero, or bullets.
 */
export default function ServicesClient({ services }: { services: Service[] }) {
  // Build a small, safe tag set. Prefer explicit tags, otherwise derive from titles.
  const allTags = useMemo(() => {
    const set = new Set<string>();

    services.forEach((s) => {
      const fromYaml = Array.isArray(s.tags) ? s.tags : [];
      fromYaml.forEach((t) => t && set.add(String(t).toLowerCase()));

      // Fallbacks: split the title into a couple of keywords
      if (!fromYaml.length && s.title) {
        s.title
          .toLowerCase()
          .split(/[\s/,&]+/)
          .filter(Boolean)
          .slice(0, 2)
          .forEach((w) => set.add(w));
      }
    });

    const out = Array.from(set);
    out.sort((a, b) => a.localeCompare(b));
    return out;
  }, [services]);

  const [active, setActive] = useState<string>("");

  const filtered = useMemo(() => {
    if (!active) return services;
    const needle = active.toLowerCase();
    return services.filter((s) => {
      const tags = (s.tags || []).map((t) => t.toLowerCase());
      const inTags = tags.includes(needle);
      const inTitle = (s.title || "").toLowerCase().includes(needle);
      const inSummary = (s.summary || "").toLowerCase().includes(needle);
      return inTags || inTitle || inSummary;
    });
  }, [active, services]);

  if (!services || services.length === 0) {
    // Render a tiny placeholder instead of throwing
    return (
      <p className={styles.lede} role="status" aria-live="polite">
        No services to display yet.
      </p>
    );
  }

  return (
    <>
      {/* Filter chips */}
      <div
        className={styles.filters}
        role="toolbar"
        aria-label="Filter services"
      >
        <button
          type="button"
          className={`${styles.chip} ${!active ? styles.active : ""}`}
          onClick={() => setActive("")}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.chip} ${active === t ? styles.active : ""}`}
            onClick={() => setActive(t)}
            aria-pressed={active === t}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <section className={styles.grid} aria-live="polite">
        {filtered.map((s) => (
          <article key={s.slug} className={styles.card}>
            <a
              className={styles.cardLink}
              href={`#${s.slug}`}
              aria-label={`View ${s.title}`}
            >
              <div className={styles.cardMedia}>
                <Image
                  src={
                    s.hero?.startsWith("/")
                      ? s.hero
                      : s.hero || "/images/hero/hero-workshop.jpg"
                  }
                  alt={s.alt || s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                {s.summary ? (
                  <p className={styles.cardSummary}>{s.summary}</p>
                ) : null}
                <span className={styles.cardCta}>View details</span>
              </div>
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
