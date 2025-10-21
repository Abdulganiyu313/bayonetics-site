"use client";

import Link from "next/link";
import styles from "./TopBar.module.scss";
import { Mail, Phone } from "lucide-react";
import { waLink, telLink, SITE } from "@/lib/site";

type Props = { variant?: "default" | "footer" };

const LINKS = {
  facebook: "https://www.facebook.com/BayoneticsEngineering",
  youtube: "https://www.youtube.com/@Bayonetics",
  linkedin: "https://www.linkedin.com/company/bayonetics-engineering",
  email: "mail.bayonetics@gmail.com",
};

// Simple WhatsApp glyph (keeps same .icon styling)
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.52 3.48A11.94 11.94 0 0 0 12.01 0C5.39 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.6 6L0 24l6.17-1.6a12 12 0 0 0 5.84 1.51h.01c6.62 0 11.99-5.37 11.99-11.99 0-3.2-1.25-6.21-3.49-8.45ZM12.02 22a9.93 9.93 0 0 1-5.05-1.39l-.36-.21-3.66.95.98-3.56-.24-.37A9.94 9.94 0 0 1 2.08 12C2.08 6.93 6.95 2.06 12.02 2.06c2.66 0 5.15 1.04 7.02 2.92a9.86 9.86 0 0 1 2.92 7.02c0 5.07-4.87 9.94-9.94 9.94Zm5.46-7.35c-.3-.15-1.76-.87-2.03-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.5-1.76-1.67-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.53.07-.8.38-.27.3-1.06 1.03-1.06 2.52 0 1.49 1.09 2.93 1.25 3.13.15.2 2.15 3.28 5.2 4.47.73.31 1.31.49 1.76.62.74.24 1.41.21 1.94.13.59-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z"
      />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.98v-2.91h2.34V9.86c0-2.31 1.38-3.59 3.49-3.59.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.91h-2.1V22c4.78-.76 8.44-4.92 8.44-9.94Z"
      />
    </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.9 3 12 3 12 3s-6.9 0-8.7.4a4 4 0 0 0-2.8 2.8C0 8 0 12 0 12s0 4 .5 5.8a4 4 0 0 0 2.8 2.8C5.1 21 12 21 12 21s6.9 0 8.7-.4a4 4 0 0 0 2.8-2.8C24 16 24 12 24 12s0-4-.5-5.8ZM9.6 15.6V8.4L15.9 12l-6.3 3.6Z"
      />
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.43 8.31h4.9v13.91h-4.9V8.31ZM8.36 8.31h4.7v1.9h.07c.65-1.23 2.25-2.52 4.63-2.52 4.95 0 5.86 3.26 5.86 7.5v7.03h-4.9v-6.23c0-1.49-.03-3.41-2.08-3.41-2.09 0-2.41 1.63-2.41 3.31v6.33H8.36V8.31Z"
      />
    </svg>
  );
}

export default function TopBar({ variant = "default" }: Props) {
  // Display number without leading plus in the pill
  const displayPhone = SITE.PHONE_E164.replace(/^\+/, "");

  return (
    <div
      className={`${styles.topbar} ${variant === "footer" ? styles.inFooter : ""}`}
      role="banner"
    >
      <div className="container">
        <ul className={styles.cells}>
          <li className={styles.cell}>
            <Link
              href={LINKS.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener"
            >
              <FacebookIcon className={styles.icon} />
            </Link>
          </li>
          <li className={styles.cell}>
            <Link
              href={LINKS.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noopener"
            >
              <YoutubeIcon className={styles.icon} />
            </Link>
          </li>
          <li className={styles.cell}>
            <Link
              href={LINKS.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener"
            >
              <LinkedinIcon className={styles.icon} />
            </Link>
          </li>

          {/* WhatsApp icon */}
          <li className={styles.cell}>
            <a
              href={waLink()}
              aria-label="Chat on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className={styles.icon} />
            </a>
          </li>

          {/* Email icon */}
          <li className={styles.cell}>
            <a href={`mailto:${LINKS.email}`} aria-label="Email">
              <Mail className={styles.icon} />
            </a>
          </li>

          {/* Phone pill */}
          <li className={`${styles.cell} ${styles.phone}`}>
            <a
              href={telLink}
              className={styles.phoneLink}
              aria-label={`Call ${displayPhone}`}
            >
              <Phone className={styles.phoneIcon} />
              <span className={styles.phoneText}>{displayPhone}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
