import styles from "./Services.module.scss";
import { getServices } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { iconFor } from "./icons";
import "@/styles/prose.scss";
import Link from "next/link";

export const metadata = { title: "Services – Bayonetics Engineering" };

// One FAQ section at the very end
const faqs = [
  {
    q: "Do you work from samples or only drawings?",
    a: "We can machine from either. If you provide a worn sample, we can reverse-engineer the critical dimensions and tolerances.",
  },
  {
    q: "What materials can you machine or weld?",
    a: "Mild steel, stainless, aluminum, brass, bronze, and engineering plastics are common. Tell us your application and we’ll recommend the right material.",
  },
  {
    q: "How quickly can I get a quote?",
    a: "Most quotes are returned same day with clear lead times. For complex parts, we may request drawings or photos.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container section">
      <div className={styles.page}>
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link> / <span>Services</span>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Services</h1>
          <p className={styles.sub}>
            From precision machining to on-site repairs, Bayonetics Engineering
            delivers specification-driven workmanship and dependable turnaround
            for industrial clients. Browse our core capabilities below.
          </p>
        </header>

        {/* Single-column service cards */}
        <div className={styles.list}>
          {services.map((s) => {
            const Icon = iconFor(s.slug);
            return (
              <section
                key={s.slug}
                id={s.slug}
                className={styles.section}
                aria-labelledby={`${s.slug}-title`}
              >
                <div className={styles.sectionHeader}>
                  <h2 id={`${s.slug}-title`} className={styles.h2}>
                    <Icon className={styles.icon} />
                    {s.title}
                  </h2>
                  {s.summary && <p className={styles.summary}>{s.summary}</p>}
                </div>

                {/* Optional long markdown content (you removed it, which is fine) */}
                {s.content && (
                  <div className={`prose ${styles.long}`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {s.content}
                    </ReactMarkdown>
                  </div>
                )}

                {s.bullets && s.bullets.length > 0 && (
                  <ul>
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                <div className={styles.bottomRow}>
                  <a
                    className={styles.cta}
                    href={`/contact?service=${encodeURIComponent(s.slug)}`}
                  >
                    Request a Quote
                  </a>
                  <span className={styles.note}>
                    Have drawings or a sample part? Attach them on the contact
                    page.
                  </span>
                </div>
              </section>
            );
          })}
        </div>

        {/* Single FAQ block at the bottom */}
        <section
          className={styles.faqBlock}
          aria-label="Frequently asked questions"
        >
          <h3>FAQs</h3>
          <ul className={styles.faqList}>
            {faqs.map((qa, i) => (
              <li key={i}>
                <strong>{qa.q}</strong>
                <br />
                {qa.a}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
