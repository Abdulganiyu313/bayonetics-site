import styles from "./Services.module.scss";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getServices, type Service } from "@/lib/content";
import ServicesClient from "./ServicesClient"; // ⬅️ use separate client file

export const metadata = {
  title: "Services | Bayonetics Engineering",
  description:
    "Industrial maintenance, fabrication, precision machining, procurement, consulting, training, and plant maintenance schedules.",
};

export default async function ServicesPage() {
  const services = await getServices();

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const itemList = services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    item: `${base || ""}/services#${s.slug}`,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: itemList,
  };

  return (
    <div className="container section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.title}>Services</h1>
          <p className={styles.lede}>
            Field-tested services for dependable operations—maintenance &
            repair, fabrication, precision machining, procurement, consulting,
            training, and planned maintenance.
          </p>
        </header>

        {/* Visual grid + filters (client component) */}
        <ServicesClient services={services} />

        {/* Anchored details (server-rendered) */}
        <section className={styles.details}>
          {services.map((s) => (
            <article
              key={s.slug}
              id={s.slug}
              className={styles.detail}
              aria-labelledby={`${s.slug}-title`}
            >
              <h2 id={`${s.slug}-title`} className={styles.detailTitle}>
                {s.title}
              </h2>

              <div className={styles.detailBody}>
                {s.hero ? (
                  <div className={styles.detailHero}>
                    <Image
                      src={
                        s.hero.startsWith("/")
                          ? s.hero
                          : "/images/hero/hero-workshop.jpg"
                      }
                      alt={s.alt || s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : null}

                <div className={styles.detailText}>
                  {s.summary ? (
                    <p className={styles.summary}>{s.summary}</p>
                  ) : null}

                  {Array.isArray(s.bullets) && s.bullets.length ? (
                    <ul className={styles.bullets}>
                      {s.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}

                  {s.content ? (
                    <div className={styles.bodyMd}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {s.content}
                      </ReactMarkdown>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
