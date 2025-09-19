"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Project.module.scss";
import type { Project } from "@/lib/content";

type Props = { project: Project };

type Pic = { src: string; caption?: string };

export default function ProjectClient({ project }: Props) {
  // Normalize gallery (support legacy `images`)
  const pics: Pic[] =
    (project.gallery && project.gallery.length
      ? project.gallery.map((g) => ({ src: g.src, caption: g.caption }))
      : (project.images || []).map((src) => ({ src, caption: undefined }))) ||
    [];

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  function openAt(i: number) {
    setIdx(i);
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % pics.length);
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + pics.length) % pics.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, pics.length]);

  if (!pics.length) return null;

  return (
    <>
      {/* Gallery grid */}
      <section className={styles.gallery} aria-label="Project gallery">
        {pics.map((p, i) => {
          const alt = p.caption?.trim() || `${project.title} – photo ${i + 1}`;
          return (
            <figure key={i} className={styles.fig}>
              <div
                className={styles.thumb}
                role="button"
                tabIndex={0}
                aria-label={`Open image ${i + 1}: ${alt}`}
                onClick={() => openAt(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openAt(i);
                }}
              >
                <Image
                  src={p.src.startsWith("/") ? p.src : p.src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Solid caption bar below image for readability */}
              <figcaption className={styles.capBlock}>
                <span className={styles.capTxt}>
                  {p.caption || "Untitled image"}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </section>

      {/* Lightbox modal */}
      <div
        className={`${styles.modal} ${open ? styles.open : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Image preview"
        onClick={close}
      >
        {open && (
          <div
            className={styles.modalImg}
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <Image
              src={pics[idx].src}
              alt={pics[idx].caption || `${project.title} – photo ${idx + 1}`}
              fill
              sizes="100vw"
            />
            <div className={styles.capModal}>
              <span className={styles.capModalTxt}>
                {pics[idx].caption || ""}
              </span>
              <span className={styles.capModalIndex}>
                {idx + 1} / {pics.length}
              </span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={close}
              aria-label="Close preview"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
}
