import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./Project.module.scss";
import ProjectClient from "./ProjectClient";
import BackButton from "./BackButton";
import { getProject, type Project } from "@/lib/content";

type RouteProps = { params: Promise<{ slug: string }> }; // <-- params is async

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params; // <-- await params
  const p = await getProject(slug);
  if (!p) return {};
  return { title: `${p.title} – Project – Bayonetics Engineering` };
}

export default async function ProjectPage({ params }: RouteProps) {
  const { slug } = await params; // <-- await params
  const p = await getProject(slug);
  if (!p) return notFound();

  // Optional notes field (if present in YAML)
  const notes = Array.isArray((p as any).notes)
    ? ((p as any).notes as string[])
    : undefined;

  // --- Breadcrumb JSON-LD (SEO only; no visual change) ---
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base || ""}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${base || ""}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.title,
        item: `${base || ""}/projects/${p.slug}`,
      },
    ],
  };

  return (
    <div className="container section">
      {/* JSON-LD script */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className={styles.wrap}>
        {/* Back button */}
        <BackButton />

        <header className={styles.head}>
          <h1 className={styles.title}>{p.title}</h1>
          {p.headline ? <p className={styles.headline}>{p.headline}</p> : null}
          {[p.client, p.location, p.date].filter(Boolean).length ? (
            <p className={styles.meta}>
              {[p.client, p.location, p.date].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          {p.summary ? <p className={styles.summary}>{p.summary}</p> : null}
        </header>

        {p.hero ? (
          <div className={styles.hero}>
            <Image
              src={
                p.hero.startsWith("/")
                  ? p.hero
                  : "/images/hero/hero-workshop.jpg"
              }
              alt={p.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}

        {/* Notes (optional) */}
        {notes?.length ? (
          <section aria-labelledby="notes-heading">
            <h2 id="notes-heading" className={styles.headline}>
              Notes
            </h2>
            <ul className={styles.outcomes}>
              {notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Client-side lightbox/gallery */}
        <ProjectClient project={p as Project} />
      </div>
    </div>
  );
}
