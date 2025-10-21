import styles from "./Services.module.scss";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getServices, type Service } from "@/lib/content";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Services | Bayonetics Engineering",
  description:
    "Industrial maintenance, fabrication, precision machining, procurement, consulting, training, and planned maintenance.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  // Guard against loader issues so the page never goes blank
  let services: Service[] = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

  const itemListLd =
    services.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            item: `${base || ""}/services#${s.slug}`,
          })),
        }
      : null;

  const provider = base
    ? { "@type": "Organization", name: "Bayonetics Engineering", url: base }
    : { "@type": "Organization", name: "Bayonetics Engineering" };

  const servicesLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary || undefined,
    areaServed: "NG",
    provider,
    url: `${base || ""}/services#${s.slug}`,
  }));

  return (
    <div className="container section">
      {/* JSON-LD (defensive: only emit when we have data) */}
      {itemListLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
        />
      ) : null}
      {servicesLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <div className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.title}>Services</h1>
          <p className={styles.lede}>
            Field-tested services for dependable operations—maintenance &amp;
            repair, fabrication, precision machining, procurement, consulting,
            training, and planned maintenance.
          </p>
        </header>

        {/* Cards + filters */}
        <ServicesClient services={services} />

        {/* Anchored long-form details */}
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

                  <div className={styles.ctaRow}>
                    <a
                      className={styles.ctaBtn}
                      href={`/contact?service=${encodeURIComponent(s.slug)}`}
                      aria-label={`Request a quote for ${s.title}`}
                    >
                      Request a Quote for {s.title}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
