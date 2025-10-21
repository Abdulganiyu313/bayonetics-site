"use client";

import styles from "./WhatsAppFab.module.scss";
import { waLink } from "@/lib/site";

/**
 * Floating WhatsApp button (FAB).
 * Uses the centralized waLink() helper so the number comes from env:
 *  - NEXT_PUBLIC_WHATSAPP_E164=+2348161660213
 */
export default function WhatsAppFab({ text }: { text?: string } = {}) {
  const href = waLink(text || "Hello Bayonetics, I’d like a quote.");

  // External link: use <a>, not next/link
  return (
    <a
      href={href}
      className={styles.fab}
      aria-label="Chat on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      WA
    </a>
  );
}
