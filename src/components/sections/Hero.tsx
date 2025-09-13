import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";

const WHATSAPP = "https://wa.me/2348012345678"; // TODO: put your real WhatsApp number

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.mediaWrap}>
        {/* Stock photo placeholder (remote allowed in next.config) */}
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop"
          alt="Workshop machining and fabrication"
          fill
          priority
          className={styles.bg}
        />
        <div className={styles.overlay} />
      </div>

      <div className="container">
        <div className={styles.content}>
          <h1>Precision Machining &amp; Fabrication</h1>
          <p>
            Custom parts, expert welding, and dependable maintenance. Built for
            industry in Ogun and across Nigeria.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryBtn} href="/contact">
              Request a Quote
            </Link>
            <a
              className={styles.ghostBtn}
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
