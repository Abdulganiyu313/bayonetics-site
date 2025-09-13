"use client";
import { useState } from "react";
import styles from "./FAQ.module.scss";

export type QA = { q: string; a: string };

export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={styles.faq}>
      <h3 className={styles.title}>FAQs</h3>
      <ul className={styles.list}>
        {items.map((it, i) => (
          <li key={i} className={styles.item}>
            <button
              className={styles.question}
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {it.q}
              <span className={styles.plus}>{open === i ? "–" : "+"}</span>
            </button>
            {open === i && <div className={styles.answer}>{it.a}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
