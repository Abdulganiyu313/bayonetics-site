import styles from "./TrustMarkers.module.scss";

const stats = [
  { k: "Capabilities", v: "Machining · Welding · Repair" },
  { k: "Response", v: "Fast quote turnarounds" },
  { k: "Quality", v: "Clean fit & finish" },
];

export default function TrustMarkers() {
  return (
    <section className="section" aria-label="Trust markers">
      <div className="container">
        <div className={styles.wrap}>
          {stats.map((s) => (
            <div key={s.k} className={styles.item}>
              <div className={styles.k}>{s.k}</div>
              <div className={styles.v}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
