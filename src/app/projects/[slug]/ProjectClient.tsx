"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Project.module.scss";
import type { Project } from "@/lib/content";

type Props = { project: Project };

export default function ProjectClient({ project }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<{
    src: string;
    caption?: string;
  } | null>(null);

  const gallery: { src: string; caption?: string }[] =
    project.gallery ??
    (project.images ? project.images.map((src) => ({ src })) : []);

  const imgOrFallback = (src?: string) =>
    src && src.startsWith("/") ? src : "/images/placeholders/project.jpg";

  return (
    <>
      {/* Gallery with captions */}
      {gallery.length ? (
        <div className={styles.gallery}>
          {gallery.map((g, i) => (
            <figure key={i} className={styles.fig}>
              <button
                className={styles.thumb}
                onClick={() => {
                  setActive(g);
                  setOpen(true);
                }}
                aria-label="Open image"
              >
                <Image
                  src={imgOrFallback(g.src)}
                  alt={g.caption || `Image ${i + 1}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </button>
              {g.caption ? (
                <figcaption className={styles.cap}>{g.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}

      {/* Outcomes */}
      {project.outcomes?.length ? (
        <>
          <h3 style={{ marginTop: 12 }}>Outcomes</h3>
          <ul className={styles.outcomes}>
            {project.outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </>
      ) : null}

      {/* Lightbox modal */}
      <div
        className={`${styles.modal} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        onClick={() => setOpen(false)}
      >
        <div className={styles.modalImg} onClick={(e) => e.stopPropagation()}>
          {active ? (
            <>
              <Image
                src={active.src}
                alt={active.caption || "Large"}
                fill
                sizes="100vw"
                style={{ objectFit: "contain", background: "#000" }}
              />
              {active.caption ? (
                <div className={styles.capModal}>{active.caption}</div>
              ) : null}
            </>
          ) : null}
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
