"use client";
import Link from "next/link";
import styles from "./WhatsAppFab.module.scss";

const WHATSAPP = "https://wa.me/2348012345678"; // TODO: your real number

export default function WhatsAppFab() {
  return (
    <Link
      href={WHATSAPP}
      className={styles.fab}
      aria-label="Chat on WhatsApp"
      target="_blank"
    >
      WA
    </Link>
  );
}
