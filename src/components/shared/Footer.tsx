import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>© {year} Bayonetics Engineering Ltd. All rights reserved.</p>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/about">Company</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
