"use client";

import Link from "next/link";
import styles from "./TopBar.module.scss";
import { Mail, Phone } from "lucide-react";

type Props = { variant?: "default" | "footer" }; // ✅ new

/** Edit these once and they update everywhere */
const LINKS = {
  facebook: "https://www.facebook.com/BayoneticsEngineering",
  youtube: "#", // TODO
  linkedin: "#", // TODO
  email: "mail.bayonetics@gmail.com",
  phone: "+2348161660213",
};

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
          <li className={styles.cell}>
            <a href={`mailto:${LINKS.email}`} aria-label="Email">
              <Mail className={styles.icon} />
            </a>
          </li>

          <li className={`${styles.cell} ${styles.phone}`}>
            <a href={`tel:${LINKS.phone}`} className={styles.phoneLink}>
              <Phone className={styles.phoneIcon} />
              <span className={styles.phoneText}>
                {LINKS.phone.replace("+", "")}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
