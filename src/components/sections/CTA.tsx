import Link from "next/link";
import styles from "./CTA.module.scss";

export default function CTA() {
  return (
    <section className={styles.band} aria-label="Final call to action">
      <div className="container">
        <div className={styles.inner}>
          <h3 className={styles.heading}>Have a drawing or sample part?</h3>
          <p className={styles.sub}>
            Send it over — we’ll review and provide a quick quote.
          </p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primary}>
              Request a Quote
            </Link>
            <Link href="/projects" className={styles.ghost}>
              See recent work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
