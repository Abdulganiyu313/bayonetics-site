import styles from "./Services.module.scss";
import { getServices } from "@/lib/content";

export const metadata = { title: "Services – Bayonetics Engineering" };

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container section">
      <header className={styles.header}>
        <h1 className={styles.title}>Services</h1>
        <p className={styles.sub}>
          Data‑driven from YAML. Click any item on the homepage to jump to that
          section.
        </p>
      </header>

      <div className={styles.list}>
        {services.map((s) => (
          <section
            key={s.slug}
            id={s.slug}
            className={styles.section}
            aria-labelledby={`${s.slug}-title`}
          >
            <h2 id={`${s.slug}-title`}>{s.title}</h2>
            <p>{s.summary}</p>
            <ul>
              {s.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
