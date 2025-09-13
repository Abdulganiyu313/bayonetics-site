import Image from "next/image";
import { Wrench, BadgeCheck, Timer } from "lucide-react";
import styles from "./WhyChooseUs.module.scss";

const features = [
  {
    icon: BadgeCheck,
    title: "Highly-trained team",
    text: "Experienced machinists and fabricators delivering clean fits and repeatable quality.",
  },
  {
    icon: Wrench,
    title: "Quality tools & machines",
    text: "Well-maintained lathes, mills and precision gauges for accurate tolerances.",
  },
  {
    icon: Timer,
    title: "Fast & dependable service",
    text: "Clear quotes, tight schedules and on-time delivery you can plan around.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <div className={styles.wrap}>
          {/* Left: copy + features */}
          <div className={styles.left}>
            <p className={styles.eyebrow}>Why choose us?</p>
            <h2 id="why-title" className={styles.title}>
              Built for industrial reliability
            </h2>
            <p className={styles.lead}>
              From precision machining to fabrication and repair, Bayonetics
              gives you workmanship you can trust and a turnaround that keeps
              production moving.
            </p>

            <ul className={styles.features}>
              {features.map(({ icon: Icon, title, text }) => (
                <li key={title} className={styles.feature}>
                  <span className={styles.iconWrap}>
                    <Icon className={styles.icon} aria-hidden />
                  </span>
                  <div>
                    <h3 className={styles.fTitle}>{title}</h3>
                    <p className={styles.fText}>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: image (you’ll replace later) */}
          <div className={styles.right}>
            <div className={styles.imageCard}>
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                alt="Workshop equipment"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
