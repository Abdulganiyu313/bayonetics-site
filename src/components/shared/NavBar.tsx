import Image from "next/image";
import Link from "next/link";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {/* Facebook page profile image as temporary logo */}
          <Image
            src="https://graph.facebook.com/bayonetics/picture?type=large"
            alt="Bayonetics Engineering"
            width={36}
            height={36}
          />
          <span>Bayonetics Engineering</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact" className={styles.cta}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
