import Link from "next/link";
import styles from "./ServicesOverview.module.scss";

type Item = { slug: string; title: string; summary: string; bullets: string[] };

const items: Item[] = [
  {
    slug: "precision-machining",
    title: "Precision Machining",
    summary: "High-accuracy turning, milling, drilling, and keyway cutting.",
    bullets: [
      "Lathe turning",
      "Milling & drilling",
      "Keyways & gear basics",
      "Reverse engineering",
    ],
  },
  {
    slug: "welding-fabrication",
    title: "Welding & Fabrication",
    summary: "Structural and sheet-metal fabrication with MIG/TIG/argon.",
    bullets: [
      "MIG / TIG / Argon",
      "Frames & guards",
      "Brackets & jigs",
      "Onsite fit-up",
    ],
  },
  {
    slug: "maintenance-repair",
    title: "Maintenance & Repair",
    summary: "Preventive and corrective repair to cut downtime.",
    bullets: [
      "Pump & gearbox work",
      "Bearing & seal replacement",
      "Shaft refurbishment",
      "Alignment",
    ],
  },
  {
    slug: "custom-parts",
    title: "Custom Parts & Components",
    summary: "One-off and small-batch spares by drawing or sample.",
    bullets: [
      "Bushings & couplings",
      "Sprockets & gears",
      "Material selection",
      "Finish & tolerances",
    ],
  },
];

export default function ServicesOverview() {
  return (
    <section className="section" aria-label="Services overview">
      <div className="container">
        <h2 className={styles.h2}>Core Services</h2>
        <div className={styles.grid}>
          {items.map((it) => (
            <article key={it.slug} className={styles.card}>
              <header>
                <h3>{it.title}</h3>
                <p className={styles.summary}>{it.summary}</p>
              </header>
              <ul className={styles.list}>
                {it.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className={styles.footer}>
                <Link href={`/services#${it.slug}`} className={styles.link}>
                  Learn more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
