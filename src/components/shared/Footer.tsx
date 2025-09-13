import Link from "next/link";
import { MapPin } from "lucide-react";
import TopBar from "@/components/shared/TopBar";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Social icons + phone strip INSIDE the footer */}
      <TopBar variant="footer" />

      <div className="container">
        {/* Main footer grid (brand mark removed) */}
        <div className={styles.columns}>
          {/* Column 1 — quick links */}
          <section aria-labelledby="f-quick" className={styles.col}>
            <h3 id="f-quick" className={styles.heading}>
              Quick links
            </h3>
            <ul className={styles.links}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </section>

          {/* Column 2 — company blurb + address with location tag */}
          <section aria-labelledby="f-about" className={styles.colWide}>
            <h3 id="f-about" className={styles.heading}>
              Bayonetics Engineering
            </h3>
            <p className={styles.blurb}>
              We deliver precision machining, fabrication and maintenance to
              reduce downtime and extend equipment life. Our team blends
              engineering expertise with hands-on industrial experience to
              provide reliable, cost-effective solutions across Nigeria.
            </p>

            <p className={styles.address}>
              <MapPin className={styles.pin} aria-hidden />
              <span>
                Kajola Junction, Beside Apple &amp; Pears Company,
                <br />
                Along Muhammadu Buhari Expressway, Ogun State, Nigeria
              </span>
            </p>
          </section>
        </div>

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Bayonetics Engineering Limited. All rights reserved.
          </p>
          <nav aria-label="Legal" className={styles.legal}>
            <Link
              href="/downloads/Bayonetics-Profile.pdf"
              target="_blank"
              rel="noopener"
            >
              Company profile (PDF)
            </Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
