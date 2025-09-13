import styles from "./TrustMarkers.module.scss";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { k: "Key Feature", v: "Cutting-Edge Technology" },
  { k: "Key Feature", v: "Skilled Craftsmanship" },
  { k: "Benefit", v: "Reliable Turnaround" },
];

export default function TrustMarkers() {
  return (
    <section className="section" aria-label="Trust markers">
      <div className="container">
        <Reveal className={styles.wrap}>
          {stats.map((s, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.k}>{s.k}</div>
              <div className={styles.v}>{s.v}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
