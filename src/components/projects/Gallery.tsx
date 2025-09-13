"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./Gallery.module.scss";

export default function Gallery({ images = [] as string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!images.length) return null;

  return (
    <>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <button
            key={i}
            className={styles.cell}
            onClick={() => setOpen(i)}
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className={styles.img}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setOpen(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className={styles.lbInner}>
            <Image
              src={images[open]}
              alt=""
              fill
              className={styles.lbImg}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
