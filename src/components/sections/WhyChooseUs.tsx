import Image from "next/image";
import { Wrench, BadgeCheck, Timer } from "lucide-react";
import styles from "./WhyChooseUs.module.scss";

// Local image paths in /public (no imports needed)
const HERO_IMG = "/images/why/hero.jpg";
const STAFF_IMG = "/images/why/staff.jpg";
const TOOLS_IMG = "/images/why/tools.jpg";
const SPEED_IMG = "/images/why/speed.jpg";

const features = [
  {
    icon: BadgeCheck,
    title: "Highly-trained team",
    text: "Experienced machinists and fabricators delivering clean fits and repeatable quality.",
    img: STAFF_IMG,
  },
  {
    icon: Wrench,
    title: "Quality tools & machines",
    text: "Well-maintained lathes, mills and precision gauges for accurate tolerances.",
    img: TOOLS_IMG,
  },
  {
    icon: Timer,
    title: "Fast & dependable service",
    text: "Clear quotes, tight schedules and on-time delivery you can plan around.",
    img: SPEED_IMG,
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
              {features.map(({ icon: Icon, title, text, img }) => (
                <li key={title} className={styles.feature}>
                  <div className={styles.thumb}>
                    {img ? (
                      <Image src={img} alt={title} fill sizes="64px" />
                    ) : (
                      <span className={styles.iconWrap}>
                        <Icon className={styles.icon} aria-hidden />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={styles.fTitle}>{title}</h3>
                    <p className={styles.fText}>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: hero image */}
          <div className={styles.right}>
            <div className={styles.imageCard}>
              <Image
                src={HERO_IMG}
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
