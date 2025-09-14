import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./Project.module.scss";
import ProjectClient from "./ProjectClient";
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

  // Safely read optional YAML field without widening your Project type
  const notes = Array.isArray((p as any).notes)
    ? ((p as any).notes as string[])
    : undefined;

  return (
    <div className="container section">
      <div className={styles.wrap}>
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
                  : "/images/placeholders/project.jpg"
              }
              alt={p.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}

        {/* NEW: Notes — uses existing styles to avoid layout shifts */}
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
