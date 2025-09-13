import styles from "./About.module.scss";
import Link from "next/link";
import { Cog, Wrench, Flame, Package } from "lucide-react";

export const metadata = { title: "About – Bayonetics Engineering Limited" };

const capabilities = [
  {
    icon: Cog,
    title: "Precision Machining",
    text: "Accuracy and efficiency in every project — turning, milling, drilling and keyways.",
  },
  {
    icon: Flame,
    title: "Fabrication Services",
    text: "Impellers, screw conveyors, trolleys, guards and more in carbon & stainless.",
  },
  {
    icon: Package,
    title: "Custom Solutions",
    text: "Tailored components and mechanisms to meet unique client requirements.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    text: "Pump, gearbox and shaft work to cut downtime and extend equipment life.",
  },
];

const equipment = [
  "Center lathe",
  "Milling machine",
  "Drill press",
  "MIG/TIG welders",
  "Grinders",
  "Measuring tools",
];

export default function AboutPage() {
  return (
    <div className="container section">
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>About Bayonetics Engineering Limited</h1>
          <p className={styles.sub}>
            We power industrial growth through innovation, precision and
            reliability. With 8+ years of experience, we deliver machine-part
            fabrication, maintenance and custom engineering across quarry, heavy
            machinery and industrial processing sectors.
          </p>
        </header>

        <div className={styles.grid}>
          <section className={styles.card} aria-labelledby="company">
            <h3 id="company" className={styles.h3}>
              Company Profile
            </h3>
            <p className={styles.p}>
              Since our founding, we’ve consistently delivered high-performance
              components and dependable services that reduce downtime, boost
              efficiency and extend equipment lifespan. Our team blends
              engineering expertise with hands-on industrial know-how to produce
              tailored solutions that meet demanding conditions.
            </p>
            <div className={styles.capGrid}>
              {capabilities.map(({ icon: Icon, title, text }) => (
                <div key={title} className={styles.cap}>
                  <h4>
                    <Icon size={18} style={{ verticalAlign: "-3px" }} /> {title}
                  </h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className={styles.equip}>
              {equipment.map((e) => (
                <span className={styles.chip} key={e}>
                  {e}
                </span>
              ))}
            </div>
          </section>

          <aside className={styles.card} aria-labelledby="stats">
            <h3 id="stats" className={styles.h3}>
              Key Features
            </h3>
            <div className={styles.kpis}>
              <div className={styles.kpi}>
                <div className={styles.k}>Cutting-Edge</div>
                <div className={styles.v}>Technology & tools</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.k}>Skilled</div>
                <div className={styles.v}>Craftsmanship</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.k}>Reliable</div>
                <div className={styles.v}>Turnaround</div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: "0 0 6px" }}>Registered Company</h4>
              <p className={styles.p}>RC: 7008839</p>
              <h4 style={{ margin: "12px 0 6px" }}>Trusted by</h4>
              <div className={styles.partners}>
                <div className={styles.partner}>Quarry & Mining</div>
                <div className={styles.partner}>Heavy Machinery</div>
                <div className={styles.partner}>Food Processing</div>
                <div className={styles.partner}>Packaging</div>
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.ctaBar}>
          <p style={{ margin: 0 }}>
            Have a drawing or sample part? Send it across — we’ll provide a
            clear quote and lead time.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" className={styles.cta}>
              Request a Quote
            </Link>
            <Link
              href="/downloads/Bayonetics-Profile.pdf"
              className={styles.cta}
              target="_blank"
              rel="noopener"
            >
              Download Company Profile (PDF)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
