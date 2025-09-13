import styles from "./About.module.scss";
import Link from "next/link";
import { Wrench, Cog, Flame, Package } from "lucide-react";

export const metadata = { title: "About – Bayonetics Engineering" };

const capabilities = [
  {
    icon: Cog,
    title: "Precision Machining",
    text: "Turning, milling, drilling, keyways & tight tolerance fits.",
  },
  {
    icon: Flame,
    title: "Welding & Fabrication",
    text: "MIG/TIG for carbon & stainless, frames, guards, hoppers.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    text: "Bearings, seals, shafts, pumps & gearboxes, alignment.",
  },
  {
    icon: Package,
    title: "Custom Components",
    text: "One-off and batch spares built from drawing or sample.",
  },
];

const equipment = [
  "Center lathe",
  "Milling machine",
  "Drill press",
  "Welding sets (MIG/TIG)",
  "Grinder",
  "Measuring tools",
];

export default function AboutPage() {
  return (
    <div className="container section">
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>About Bayonetics Engineering</h1>
          <p className={styles.sub}>
            We build reliable metalwork and precision parts for industry in
            Nigeria — combining practical shop-floor experience with responsive
            service and clean finishes.
          </p>
        </header>

        <div className={styles.grid}>
          <section className={styles.card} aria-labelledby="company">
            <h3 id="company" className={styles.h3}>
              Company Profile
            </h3>
            <p className={styles.p}>
              Bayonetics Engineering provides precision machining, welding &
              fabrication, and maintenance services. We work from drawings or
              samples and keep lead times tight so your line gets back to spec
              quickly.
            </p>
            <div className={styles.capGrid}>
              {capabilities.map(({ icon: Icon, title, text }) => (
                <div key={title} className={styles.cap}>
                  <h4>
                    <Icon
                      size={18}
                      style={{ verticalAlign: "-3px", color: "var(--accent)" }}
                    />{" "}
                    {title}
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
              Why work with us
            </h3>
            <div className={styles.kpis}>
              <div className={styles.kpi}>
                <div className={styles.k}>24h</div>
                <div className={styles.v}>Quote Turnaround</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.k}>99%</div>
                <div className={styles.v}>On-time Delivery</div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.k}>A+</div>
                <div className={styles.v}>Fit & Finish</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: "0 0 6px" }}>Trusted by</h4>
              <div className={styles.partners}>
                <div className={styles.partner}>FMCG</div>
                <div className={styles.partner}>Food Processing</div>
                <div className={styles.partner}>Packaging</div>
                <div className={styles.partner}>OEMs</div>
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.ctaBar}>
          <p style={{ margin: 0 }}>
            Have a drawing or sample part? Send it across — we’ll review and
            provide a clear quote.
          </p>
          <Link href="/contact" className={styles.cta}>
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
