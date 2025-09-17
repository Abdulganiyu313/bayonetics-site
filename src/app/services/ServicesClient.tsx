"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./Services.module.scss";
import type { Service } from "@/lib/content";

export default function ServicesClient({ services }: { services: Service[] }) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    services.forEach((s) => (s.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [services]);

  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!tag) return services;
    return services.filter((s) => (s.tags || []).includes(tag));
  }, [services, tag]);

  return (
    <>
      <div className={styles.filters} aria-label="Filter services">
        <button
          type="button"
          className={!tag ? styles.chipActive : styles.chip}
          aria-pressed={!tag}
          onClick={() => setTag(null)}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            className={tag === t ? styles.chipActive : styles.chip}
            aria-pressed={tag === t}
            onClick={() => setTag((prev) => (prev === t ? null : t))}
          >
            {t}
          </button>
        ))}
      </div>

      <section className={styles.grid} aria-live="polite">
        {filtered.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className={styles.card}
            aria-label={`Jump to ${s.title}`}
          >
            <div className={styles.media}>
              <Image
                src={
                  s.hero?.startsWith("/")
                    ? s.hero
                    : "/images/hero/hero-workshop.jpg"
                }
                alt={s.alt || s.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                priority={false}
              />
              <div className={styles.overlay}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                {s.summary ? (
                  <p className={styles.cardSummary}>{s.summary}</p>
                ) : null}
              </div>
            </div>
          </a>
        ))}
      </section>
    </>
  );
}
